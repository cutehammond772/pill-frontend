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
  ValidationErrorMessages,
  ValidationResponse,
  ValidatorInfo,
} from "../validators/validator.type";

const validatorSelector = (validatorID: string) => (state: RootState) =>
  state.validation.validators[validatorID];

const dependenciesSelector = (validatorID: string) => (state: RootState) =>
  state.validation.dependencies[validatorID];

const validationSelector = (validatorID: string) => (state: RootState) =>
  state.validation.data[validatorID];

// yield를 통해 얻는 객체는 타입을 알 수 없으므로 타입 체크를 위해 따로 만들어졌다.
type Validator = ValidatorInfo | undefined;
type Dependencies = Array<string> | undefined;
type Response = ValidationResponse | undefined;

// redux store에 디스패치하는 액션이 아닌 사가 액션을 나타낸다.
type AddValidatorAction = ReturnType<typeof actions.addValidator>;
type RemoveValidatorAction = ReturnType<typeof actions.removeValidator>;
type UpdateValidationAction = ReturnType<typeof actions.updateValidation>;
type AddDependencyAction = ReturnType<typeof internal.sagaAddDependency>;
type RemoveDependencyAction = ReturnType<typeof internal.sagaRemoveDependency>;

// 디스패치 액션을 나타낸다.
type AddValidatorDispatch = ReturnType<typeof internal.addValidator>;
type RemoveValidatorDispatch = ReturnType<typeof internal.removeValidator>;
type SetValidationDispatch = ReturnType<typeof internal.setValidation>;
type AddDependencyDispatch = ReturnType<typeof internal.addDependency>;
type RemoveDependencyDispatch = ReturnType<typeof internal.removeDependency>;

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

const waitAddingValidator = (validatorID: string) =>
  waitDispatch<AddValidatorDispatch>(
    validatorID,
    ActionTypes.ADD_VALIDATOR,
    (action) => action.payload.data.validatorID
  );

const waitSettingValidation = (validatorID: string) =>
  waitDispatch<SetValidationDispatch>(
    validatorID,
    ActionTypes.SET_VALIDATION,
    (action) => action.payload.validatorID
  );

const waitRemovingValidator = (validatorID: string) =>
  waitDispatch<RemoveValidatorDispatch>(
    validatorID,
    ActionTypes.REMOVE_VALIDATOR,
    (action) => action.payload.validatorID
  );

const waitAddingDependency = (validatorID: string) =>
  waitDispatch<AddDependencyDispatch>(
    validatorID,
    ActionTypes.ADD_DEPENDENCY,
    (action) => action.payload.validatorID
  );

const waitRemovingDependency = (validatorID: string) =>
  waitDispatch<RemoveDependencyDispatch>(
    validatorID,
    ActionTypes.REMOVE_DEPENDENCY,
    (action) => action.payload.validatorID
  );

// Handle Functions
const handleAddingValidator = function* (action: AddValidatorAction) {
  const { validatorID } = action.payload.data;
  const validator: Validator = yield select(validatorSelector(validatorID));

  if (!!validator) {
    throw new Error(
      "[validatorAddingFlow] 이미 Validator가 등록된 상태입니다."
    );
  }

  // Validator를 디스패치한다.
  yield put(internal.addValidator(action.payload));
};

const handleDepValidator = function* (action: AddValidatorAction) {
  // 상위 Validator에 의존성을 추가한다.
  const { dependency } = action.payload.data;

  if (!dependency) {
    // 상위 Validator를 설정하지 않은 경우 그대로 종결한다.
    return;
  }

  const depValidator: Validator = yield select(validatorSelector(dependency));

  if (!depValidator) {
    yield call(
      waitWithTimeout,
      call(waitAddingValidator, dependency),
      5000,
      "[validatorAddingFlow] 상위 Validator가 등록되지 않았습니다."
    );
  }

  yield put(
    internal.sagaAddDependency({
      validatorID: dependency,
      dependedValidatorID: action.payload.data.validatorID,
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
  if (!!validator.dependency) {
    yield put(
      internal.removeDependency({
        validatorID: validator.dependency,
        dependedValidatorID: validatorID,
      })
    );
  }

  yield put(internal.removeValidator({ validatorID }));
  yield put(internal.removeValidation({ validatorID }));

  // 하위 Validator에 모두 삭제 요청을 보낸다.
  const dependencies: Dependencies = yield select(
    dependenciesSelector(validatorID)
  );
  if (!!dependencies) {
    for (const dep of dependencies) {
      yield put(actions.removeValidator({ validatorID: dep }));
    }

    yield put(internal.clearDependencies({ validatorID }));
  }
};

const handleValidationUpdating = function* (action: UpdateValidationAction) {
  const { validatorID, response } = action.payload;
  const validator: Validator = yield select(validatorSelector(validatorID));

  // Validator가 존재하지 않는 경우 디스패치하는 의미가 없으므로 그대로 종결한다.
  if (!validator) {
    return;
  }

  const minDependencies = validator.minDependencies || 0;
  const depAccumulation: ValidationResponse = { valid: true, messages: [] };

  // 하위 Validator가 존재하는 경우
  if (minDependencies > 0) {
    let count = 0;

    const dependencies: Dependencies = yield select(
      dependenciesSelector(validatorID)
    );

    if (!dependencies) {
      depAccumulation.valid = false;
      depAccumulation.messages = [
        ValidationErrorMessages.DEPENDENCIES_NOT_ADDED,
      ];
    } else {
      // 하위 Validator의 검증 결과를 모두 모은다.
      for (const dep of dependencies) {
        const validator: Validator = yield select(validatorSelector(dep));

        // 하위 Validator가 존재하지 않는 경우 넘어간다.
        if (!validator) {
          continue;
        }

        count += 1;
        const validation: Response = yield select(validationSelector(dep));

        if (!validation) {
          depAccumulation.valid = false;
          depAccumulation.messages = [
            ValidationErrorMessages.DEPENDENCIES_NOT_VALIDATED,
          ];
          break;
        }

        if (validation.valid) {
          continue;
        }

        depAccumulation.valid = false;
        depAccumulation.messages.push(...validation.messages);
      }

      if (minDependencies > count) {
        depAccumulation.valid = false;
        depAccumulation.messages = [ValidationErrorMessages.LACK_DEPENDENCIES];
      }
    }
  }

  // 검증 결과를 모두 합친다.
  const combine = response || depAccumulation;

  if (!!response) {
    combine.valid = response.valid && depAccumulation.valid;
    combine.messages.push(...depAccumulation.messages);
  }

  // 검증 결과를 디스패치한다.
  yield put(internal.setValidation({ validatorID, validation: combine }));
};

// Validator Flow
const validatorFlow = function* (action: AddValidatorAction) {
  const { validatorID, dependency } = action.payload.data;

  // 이 Validator가 존재하는 동안 검증 결과 갱신 요청을 계속 누적한다.
  // 이 요청만 채널을 따로 두는 이유는,
  // 하위 Validator가 먼저 추가된 후 상위 Validator로 검증 결과 갱신 요청을 보낼 때
  // 아직 이 Validator가 추가되지 않은 경우 미리 요청만 누적시키기 위해서이다.
  const validationChannel: Channel<UpdateValidationAction> =
    yield actionChannel(ActionTypes.SAGA_UPDATE_VALIDATION);

  // 1. Validator를 추가한다.
  yield fork(handleAddingValidator, action);

  // Validator가 추가될 때까지 기다린다. (5초 타임아웃 존재)
  yield call(
    waitWithTimeout,
    call(waitAddingValidator, validatorID),
    5000,
    "[validatorFlow] Validator가 추가되지 않았습니다."
  );

  // 2. 상위 Validator의 하위 Validator 목록에 추가한다.
  yield fork(handleDepValidator, action);

  // 3. 아래의 네 가지 요청을 받아 각각 처리한다.
  while (true) {
    // 네 가지 요청 중 가장 먼저 오는 요청부터 처리한다.
    const {
      updateValidation,
      removeValidator,
      addDependency,
      removeDependency,
    } = yield race({
      // 버퍼로부터 요청을 가져온다.
      updateValidation: take(validationChannel),

      // 삭제 요청을 가져온다.
      removeValidator: take(ActionTypes.SAGA_REMOVE_VALIDATOR),

      // 하위 Validator 추가 요청을 가져온다.
      addDependency: take(ActionTypes.SAGA_ADD_DEPENDENCY),

      // 하위 Validator 삭제 요청을 가져온다.
      removeDependency: take(ActionTypes.SAGA_REMOVE_DEPENDENCY),
    });

    // 3-1. 검증 결과 갱신 요청
    if (!!updateValidation) {
      const action: UpdateValidationAction = updateValidation;
      // 다른 Validator 요청이면 건너뛴다.
      if (action.payload.validatorID !== validatorID) {
        continue;
      }

      // 검증 결과를 갱신한다.
      yield fork(handleValidationUpdating, action);

      // 갱신될 때까지 기다린다.
      yield call(
        waitWithTimeout,
        call(waitSettingValidation, validatorID),
        5000,
        "[validatorFlow] 검증 결과가 갱신되지 않았습니다."
      );

      // 상위 Validator에 검증 결과 갱신을 요청한다.
      if (!!dependency) {
        yield put(actions.updateValidation({ validatorID: dependency }));
      }
    }

    // 3-2. Validator 삭제 요청
    if (!!removeValidator) {
      const action: RemoveValidatorAction = removeValidator;

      // 삭제 요청을 보낸다.
      yield fork(handleValidatorRemoving, action);

      // 제대로 삭제되었는지 확인한다.
      yield call(
        waitWithTimeout,
        call(waitRemovingValidator, validatorID),
        5000,
        "[validatorFlow] Validator를 삭제하는 데 실패하였습니다."
      );

      // 이 루프를 종료한다.
      break;
    }

    // 3-3. 하위 Validator 추가 요청
    if (!!addDependency) {
      const action: AddDependencyAction = addDependency;
      // 다른 Validator 요청이면 건너뛴다.
      if (action.payload.validatorID !== validatorID) {
        continue;
      }

      // 하위 Validator를 추가한다.
      yield put(internal.addDependency(action.payload));

      // 추가될 때까지 기다린다.
      yield call(
        waitWithTimeout,
        call(waitAddingDependency, validatorID),
        5000,
        "[validatorFlow] 하위 Validator를 추가하는 데 실패하였습니다."
      );

      // 일반적으로는 맨 처음에 모두 Validator가 추가되지만,
      // 나중에 다른 Validator와 의존 관계를 형성할 경우 검증 결과를 갱신하기 위한 목적이다.
      yield put(actions.updateValidation({ validatorID }));
    }

    // 3-4. 하위 Validator 삭제 요청
    if (!!removeDependency) {
      const action: RemoveDependencyAction = removeDependency;
      // 다른 Validator 요청이면 건너뛴다.
      if (action.payload.validatorID !== validatorID) {
        continue;
      }

      // 하위 Validator를 삭제한다.
      yield put(internal.removeDependency(action.payload));

      // 삭제될 때까지 기다린다.
      yield call(
        waitWithTimeout,
        call(waitRemovingDependency, validatorID),
        5000,
        "[validatorFlow] 하위 Validator를 삭제하는 데 실패하였습니다."
      );

      yield put(actions.updateValidation({ validatorID }));
    }
  }
};

export default function* validationSaga() {
  yield all([takeEvery(ActionTypes.SAGA_ADD_VALIDATOR, validatorFlow)]);
}
