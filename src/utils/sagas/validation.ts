import { Channel } from "redux-saga";
import {
  actionChannel,
  all,
  call,
  CallEffect,
  delay,
  fork,
  put,
  race,
  select,
  take,
  takeEvery,
} from "redux-saga/effects";
import { RootState } from "../reducers";
import {
  InternalActions as internal,
  Actions as actions,
  ActionTypes,
} from "../reducers/validation";
import {
  resolvePattern,
  Validation,
  ValidatorInfo,
} from "../validators/validator.type";

const validatorSelector = (validatorID: string) => (state: RootState) =>
  state.validation.validators[validatorID];

const subsSelector = (validatorID: string) => (state: RootState) =>
  state.validation.subs[validatorID];

const validationSelector = (validatorID: string) => (state: RootState) =>
  state.validation.data[validatorID];

// yield를 통해 얻는 객체는 타입을 알 수 없으므로 타입 체크를 위해 따로 만들어졌다.
type Validator = ValidatorInfo | undefined;
type Subs = Array<string> | undefined;
type Response = Validation | undefined;

// redux store에 디스패치하는 액션이 아닌 사가 액션을 나타낸다.
type RegisterValidatorAction = ReturnType<typeof actions.registerValidator>;
type RemoveValidatorAction = ReturnType<typeof actions.removeValidator>;
type UpdateValidationAction = ReturnType<typeof actions.updateValidation>;
type AddSubValidatorAction = ReturnType<typeof internal.sagaAddSubValidator>;
type RemoveSubValidatorAction = ReturnType<
  typeof internal.sagaRemoveSubValidator
>;

// 디스패치 액션을 나타낸다.
type RegisterValidatorDispatch = ReturnType<typeof internal.registerValidator>;
type RemoveValidatorDispatch = ReturnType<typeof internal.removeValidator>;
type SetValidationDispatch = ReturnType<typeof internal.setValidation>;
type AddSubValidatorDispatch = ReturnType<typeof internal.addSubValidator>;
type RemoveSubValidatorDispatch = ReturnType<
  typeof internal.removeSubValidator
>;

// Timeout Function
const waitWithTimeout = function* (
  fn: CallEffect,
  timeMs: number,
  timeoutMessage: string
) {
  const { timeout } = yield race({
    wait: fn,
    timeout: delay(timeMs),
  });

  if (!!timeout) {
    throw new Error(timeoutMessage);
  }
};

// Wait Functions
const waitDispatch = function* <T>(
  validatorID: string,
  dispatch: string,
  validatorIDFn: (t: T) => string
) {
  while (true) {
    const action: T = yield take(dispatch);

    if (validatorIDFn(action) === validatorID) {
      break;
    }
  }
};

const waitRegisterValidator = (validatorID: string) =>
  waitDispatch<RegisterValidatorDispatch>(
    validatorID,
    ActionTypes.REGISTER_VALIDATOR,
    (action) => action.payload.data.validatorID
  );

const waitSetValidation = (validatorID: string) =>
  waitDispatch<SetValidationDispatch>(
    validatorID,
    ActionTypes.SET_VALIDATION,
    (action) => action.payload.validatorID
  );

const waitRemoveValidator = (validatorID: string) =>
  waitDispatch<RemoveValidatorDispatch>(
    validatorID,
    ActionTypes.REMOVE_VALIDATOR,
    (action) => action.payload.validatorID
  );

const waitAddSubValidator = (validatorID: string) =>
  waitDispatch<AddSubValidatorDispatch>(
    validatorID,
    ActionTypes.ADD_SUB_VALIDATOR,
    (action) => action.payload.validatorID
  );

const waitRemoveSubValidator = (validatorID: string) =>
  waitDispatch<RemoveSubValidatorDispatch>(
    validatorID,
    ActionTypes.REMOVE_SUB_VALIDATOR,
    (action) => action.payload.validatorID
  );

// Handle Functions
const handleRegisterValidator = function* (action: RegisterValidatorAction) {
  const { validatorID } = action.payload.data;
  const validator: Validator = yield select(validatorSelector(validatorID));

  if (!!validator) {
    throw new Error(
      "[validatorAddingFlow] 이미 Validator가 등록된 상태입니다."
    );
  }

  // Validator를 디스패치한다.
  yield put(internal.registerValidator(action.payload));
};

const handleTopValidator = function* (action: RegisterValidatorAction) {
  // 상위 Validator에 의존성을 추가한다.
  const { top } = action.payload.data;

  if (!top) {
    // 상위 Validator를 설정하지 않은 경우 그대로 종결한다.
    return;
  }

  const topValidator: Validator = yield select(validatorSelector(top));

  if (!topValidator) {
    yield call(
      waitWithTimeout,
      call(waitRegisterValidator, top),
      5000,
      "[validatorAddingFlow] 상위 Validator가 등록되지 않았습니다."
    );
  }

  yield put(
    internal.sagaAddSubValidator({
      validatorID: top,
      subValidatorID: action.payload.data.validatorID,
    })
  );
};

const handleValidatorRemoving = function* (action: RemoveValidatorAction) {
  const { validatorID } = action.payload;
  const validator: Validator = yield select(validatorSelector(validatorID));

  if (!validator) {
    throw new Error(
      "[validatorRemovingFlow] 존재하지 않는 Validator에 대해 삭제를 시도했습니다."
    );
  }

  // Validator와 검증 결과를 모두 삭제한다.
  if (!!validator.top) {
    yield put(
      internal.removeSubValidator({
        validatorID: validator.top,
        subValidatorID: validatorID,
      })
    );
  }

  yield put(internal.removeValidator({ validatorID }));
  yield put(internal.removeValidation({ validatorID }));

  // 하위 Validator에 모두 삭제 요청을 보낸다.
  const subs: Subs = yield select(subsSelector(validatorID));

  if (!!subs) {
    for (const subValidator of subs) {
      yield put(actions.removeValidator({ validatorID: subValidator }));
    }

    yield put(internal.clearSubValidators({ validatorID }));
  }
};

const handleValidationUpdating = function* (action: UpdateValidationAction) {
  const { validatorID, validation } = action.payload;
  const validator: Validator = yield select(validatorSelector(validatorID));

  // Validator가 존재하지 않는 경우 디스패치하는 의미가 없으므로 그대로 종결한다.
  if (!validator) {
    return;
  }

  const subAccumulation: Validation = { valid: true, messages: [] };

  // 하위 Validator가 존재하는 경우
  if (!!validator.subPattern) {
    const subs: Subs = yield select(subsSelector(validatorID));

    if (!subs) {
      const valid = resolvePattern(validator.subPattern, []);

      subAccumulation.valid = valid;
      !valid &&
        (subAccumulation.messages = [
          "[handleValidationUpdating] 특정 하위 Validator가 존재해야 하지만, 아직 등록되지 않은 상태입니다.",
        ]);
    } else {
      const valid = resolvePattern(validator.subPattern, subs);

      if (!valid) {
        subAccumulation.valid = false;
        subAccumulation.messages = [
          "[handleValidationUpdating] 등록된 하위 Validator의 구성이 이 Validator에 설정된 패턴과 일치하지 않습니다.",
        ];
      } else {
        // 하위 Validator의 검증 결과를 모두 모은다.
        for (const sub of subs) {
          const subValidator: Validator = yield select(validatorSelector(sub));

          // 하위 Validator가 존재하지 않는 경우 넘어간다.
          if (!subValidator) {
            continue;
          }

          const validation: Response = yield select(validationSelector(sub));

          if (!validation) {
            subAccumulation.valid = false;
            subAccumulation.messages = [
              "[handleValidationUpdating] 등록된 하위 Validator 중 아직 검증되지 않은 Validator가 존재합니다.",
            ];
            break;
          }

          if (validation.valid) {
            continue;
          }

          subAccumulation.valid = false;
          subAccumulation.messages.push(...validation.messages);
        }
      }
    }
  }

  // 검증 결과를 모두 합친다.
  const combine = validation || subAccumulation;

  if (!!validation) {
    combine.valid = validation.valid && subAccumulation.valid;
    combine.messages.push(...subAccumulation.messages);
  }

  // 검증 결과를 디스패치한다.
  yield put(internal.setValidation({ validatorID, validation: combine }));
};

type ValidatorActions =
  | UpdateValidationAction
  | RemoveSubValidatorAction
  | AddSubValidatorAction
  | RemoveSubValidatorAction;

// Validator Flow
const validatorFlow = function* (action: RegisterValidatorAction) {
  const { validatorID, top } = action.payload.data;

  // 네 가지 요청을 받는다.
  const channel: Channel<ValidatorActions> = yield actionChannel([
    ActionTypes.SAGA_UPDATE_VALIDATION,
    ActionTypes.SAGA_REMOVE_VALIDATOR,
    ActionTypes.SAGA_ADD_SUB_VALIDATOR,
    ActionTypes.SAGA_REMOVE_SUB_VALIDATOR,
  ]);

  // 1. Validator를 추가한다.
  yield fork(handleRegisterValidator, action);

  // Validator가 추가될 때까지 기다린다. (5초 타임아웃 존재)
  yield call(
    waitWithTimeout,
    call(waitRegisterValidator, validatorID),
    5000,
    "[validatorFlow] Validator가 추가되지 않았습니다."
  );

  // 2. 상위 Validator의 하위 Validator 목록에 추가한다.
  yield fork(handleTopValidator, action);

  // 3. 네 가지 요청을 순서대로 받아 각각 처리한다.
  while (true) {
    // 위의 네 가지 요청 중 가장 먼저 오는 요청부터 처리한다.
    const validatorAction: ValidatorActions = yield take(channel);

    // 3-1. 검증 결과 갱신 요청
    if (validatorAction.type === ActionTypes.SAGA_UPDATE_VALIDATION) {
      const action: UpdateValidationAction = validatorAction;
      // 다른 Validator 요청이면 건너뛴다.
      if (action.payload.validatorID !== validatorID) {
        continue;
      }

      // 검증 결과를 갱신한다.
      yield fork(handleValidationUpdating, action);

      // 갱신될 때까지 기다린다.
      yield call(
        waitWithTimeout,
        call(waitSetValidation, validatorID),
        5000,
        "[validatorFlow] 검증 결과가 갱신되지 않았습니다."
      );

      // 상위 Validator에 검증 결과 갱신을 요청한다.
      if (!!top) {
        yield put(actions.updateValidation({ validatorID: top }));
      }
    }

    // 3-2. Validator 삭제 요청
    if (validatorAction.type === ActionTypes.SAGA_REMOVE_VALIDATOR) {
      const action: RemoveValidatorAction = validatorAction;

      // 다른 Validator 요청이면 건너뛴다.
      if (action.payload.validatorID !== validatorID) {
        continue;
      }

      // 삭제 요청을 보낸다.
      yield fork(handleValidatorRemoving, action);

      // 제대로 삭제되었는지 확인한다.
      yield call(
        waitWithTimeout,
        call(waitRemoveValidator, validatorID),
        5000,
        "[validatorFlow] Validator를 삭제하는 데 실패하였습니다."
      );

      // 이 루프를 종료한다.
      break;
    }

    // 3-3. 하위 Validator 추가 요청
    if (
      validatorAction.type === ActionTypes.SAGA_ADD_SUB_VALIDATOR &&
      "subValidatorID" in validatorAction
    ) {
      const action: AddSubValidatorAction = validatorAction;

      // 다른 Validator 요청이면 건너뛴다.
      if (action.payload.validatorID !== validatorID) {
        continue;
      }

      // 하위 Validator를 추가한다.
      yield put(internal.addSubValidator(action.payload));

      // 추가될 때까지 기다린다.
      yield call(
        waitWithTimeout,
        call(waitAddSubValidator, validatorID),
        5000,
        "[validatorFlow] 하위 Validator를 추가하는 데 실패하였습니다."
      );

      // 일반적으로는 맨 처음에 모두 Validator가 추가되지만,
      // 나중에 다른 Validator와 의존 관계를 형성할 경우 검증 결과를 갱신하기 위한 목적이다.
      yield put(actions.updateValidation({ validatorID }));
    }

    // 3-4. 하위 Validator 삭제 요청
    if (
      validatorAction.type === ActionTypes.SAGA_REMOVE_SUB_VALIDATOR &&
      "subValidatorID" in validatorAction
    ) {
      const action: RemoveSubValidatorAction = validatorAction;

      // 다른 Validator 요청이면 건너뛴다.
      if (action.payload.validatorID !== validatorID) {
        continue;
      }

      // 하위 Validator를 삭제한다.
      yield put(internal.removeSubValidator(action.payload));

      // 삭제될 때까지 기다린다.
      yield call(
        waitWithTimeout,
        call(waitRemoveSubValidator, validatorID),
        5000,
        "[validatorFlow] 하위 Validator를 삭제하는 데 실패하였습니다."
      );

      yield put(actions.updateValidation({ validatorID }));
    }
  }
};

export default function* validationSaga() {
  yield all([takeEvery(ActionTypes.SAGA_REGISTER_VALIDATOR, validatorFlow)]);
}
