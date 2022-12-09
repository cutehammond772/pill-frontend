import * as types from "./validation.type";
import * as functions from "./validation.function";
import { Channel } from "redux-saga";
import {
  actionChannel,
  all,
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
} from "redux-saga/effects";
import {
  InternalActions as internal,
  Actions as actions,
  SagaActionTypes,
} from "../../reducers/validation";
import { resolvePattern, Validation } from "../../validators/validator.type";

const handleRegisterValidator = function* (
  action: types.RegisterValidatorAction
) {
  const { validatorID } = action.payload.data;
  const validator: types.Validator = yield select(
    types.validatorSelector(validatorID)
  );

  if (!!validator) {
    throw new Error(
      "[validatorAddingFlow] 이미 Validator가 등록된 상태입니다."
    );
  }

  // Validator를 디스패치한다.
  yield put(internal.registerValidator(action.payload));
};

const handleAddSubValidator = function* (
  action: types.RegisterValidatorAction
) {
  // 상위 Validator에 하위 Validator를 추가한다.
  const { top } = action.payload.data;

  if (!top) {
    // 상위 Validator를 설정하지 않은 경우 그대로 종결한다.
    return;
  }

  const topValidator: types.Validator = yield select(
    types.validatorSelector(top)
  );

  if (!topValidator) {
    yield call(
      functions.waitWithTimeout,
      call(functions.waitRegisterValidator, top),
      5000,
      "[validatorAddingFlow] 상위 Validator가 등록되지 않았습니다."
    );
  }

  yield put(
    internal.requestAddSubValidator({
      validatorID: top,
      subValidatorID: action.payload.data.validatorID,
    })
  );
};

const handleRemoveValidator = function* (action: types.RemoveValidatorAction) {
  const { validatorID } = action.payload;
  const validator: types.Validator = yield select(
    types.validatorSelector(validatorID)
  );

  if (!validator) {
    throw new Error(
      "[validatorRemovingFlow] 존재하지 않는 Validator에 대해 삭제를 시도했습니다."
    );
  }

  // Validator와 검증 결과를 모두 삭제한다.
  if (!!validator.top) {
    yield put(
      internal.requestRemoveSubValidator({
        validatorID: validator.top,
        subValidatorID: validatorID,
      })
    );
  }

  yield put(internal.removeValidator({ validatorID }));
  yield put(internal.removeValidation({ validatorID }));

  // 하위 Validator에 모두 삭제 요청을 보낸다.
  const subs: types.Subs = yield select(types.subsSelector(validatorID));

  if (!!subs) {
    for (const subValidator of subs) {
      yield put(actions.removeValidator({ validatorID: subValidator }));
    }

    yield put(internal.clearSubValidators({ validatorID }));
  }
};

const handleUpdateDomainValidation = function* (
  action: types.UpdateDomainValidationAction
) {
  const { validatorID, result } = action.payload;
  const validator: types.Validator = yield select(
    types.validatorSelector(validatorID)
  );

  // Validator가 존재하지 않는 경우 디스패치하는 의미가 없으므로 그대로 종결한다.
  if (!validator) {
    return;
  }

  // DomainValidator의 검증 결과를 갱신한다.
  yield put(internal.setDomainValidation({ validatorID, result }));
};

const handleUpdateSubValidation = function* (
  action: types.UpdateSubValidationAction
) {
  const { validatorID } = action.payload;
  const validator: types.Validator = yield select(
    types.validatorSelector(validatorID)
  );

  // Validator가 존재하지 않는 경우 디스패치하는 의미가 없으므로 그대로 종결한다.
  if (!validator) {
    return;
  }

  const subAccumulation: Validation = { valid: true, messages: [] };

  // 하위 Validator가 존재하는 경우
  if (!!validator.subPattern) {
    const subs: types.Subs = yield select(types.subsSelector(validatorID));

    if (!subs) {
      const valid = resolvePattern(validator.subPattern, []);

      subAccumulation.valid = valid;
      !valid &&
        (subAccumulation.messages = [
          "[handleSubValidationUpdate] 특정 하위 Validator가 존재해야 하지만, 아직 등록되지 않은 상태입니다.",
        ]);
    } else {
      const valid = resolvePattern(validator.subPattern, subs);

      if (!valid) {
        subAccumulation.valid = false;
        subAccumulation.messages = [
          "[handleSubValidationUpdate] 등록된 하위 Validator의 구성이 이 Validator에 설정된 패턴과 일치하지 않습니다.",
        ];
      } else {
        // 하위 Validator의 검증 결과를 모두 모은다.
        for (const sub of subs) {
          const subValidator: types.Validator = yield select(
            types.validatorSelector(sub)
          );

          // 하위 Validator가 존재하지 않는 경우 넘어간다.
          if (!subValidator) {
            continue;
          }

          const validation: types.Response = yield select(
            types.validationSelector(sub)
          );

          if (!validation) {
            subAccumulation.valid = false;
            subAccumulation.messages = [
              "[handleSubValidationUpdate] 등록된 하위 Validator 중 아직 검증되지 않은 Validator가 존재합니다.",
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

    // 하위 Validator의 검증 결과를 갱신한다.
    yield put(
      internal.setSubValidation({ validatorID, result: subAccumulation })
    );
  }
};

const handleCombineValidation = function* (validatorID: string) {
  const validator: types.Validator = yield select(
    types.validatorSelector(validatorID)
  );

  // Validator가 존재하지 않는 경우 그대로 종결한다.
  if (!validator) {
    return;
  }

  const validation: types.Response = yield select(
    types.validationSelector(validatorID)
  );

  // 검증 결과가 존재하지 않는 경우 그대로 종결한다.
  if (!validation) {
    return;
  }

  const valid = !validator.subPattern
    ? // 하위 Validator가 존재하지 않는 경우
      !!validation.domain?.valid
    : // 하위 Validator가 존재하는 경우
      !!validation.domain?.valid && !!validation.sub?.valid;

  const messages = [
    ...(validation.domain?.messages || []),
    ...(validation.sub?.messages || []),
  ];

  yield put(
    internal.combineValidation({ validatorID, result: { valid, messages } })
  );
};

type ValidatorActions =
  | types.UpdateDomainValidationAction
  | types.UpdateSubValidationAction
  | types.RemoveSubValidatorAction
  | types.AddSubValidatorAction
  | types.RemoveSubValidatorAction;

// Validator Flow
const validatorFlow = function* (action: types.RegisterValidatorAction) {
  const { validatorID, top } = action.payload.data;

  // 네 가지 요청을 받는다.
  const channel: Channel<ValidatorActions> = yield actionChannel([
    SagaActionTypes.SAGA_UPDATE_DOMAIN_VALIDATION,
    SagaActionTypes.SAGA_UPDATE_SUB_VALIDATION,

    SagaActionTypes.SAGA_ADD_SUB_VALIDATOR,
    SagaActionTypes.SAGA_REMOVE_SUB_VALIDATOR,

    SagaActionTypes.SAGA_REMOVE_VALIDATOR,
  ]);

  // 1. Validator를 추가한다.
  yield fork(handleRegisterValidator, action);

  // Validator가 추가될 때까지 기다린다. (5초 타임아웃 존재)
  yield call(
    functions.waitWithTimeout,
    call(functions.waitRegisterValidator, validatorID),
    5000,
    "[validatorFlow] Validator가 추가되지 않았습니다."
  );

  // 2. 상위 Validator의 하위 Validator 목록에 추가한다.
  yield fork(handleAddSubValidator, action);

  // 3. 다섯가지 요청을 순서대로 받아 각각 처리한다.
  while (true) {
    // 위의 네 가지 요청 중 가장 먼저 오는 요청부터 처리한다.
    const validatorAction: ValidatorActions = yield take(channel);

    // 다른 Validator 요청이면 건너뛴다.
    if (validatorAction.payload.validatorID !== validatorID) {
      continue;
    }

    // 3-1. DomainValidator의 검증 결과 갱신 요청
    if (
      validatorAction.type === SagaActionTypes.SAGA_UPDATE_DOMAIN_VALIDATION
    ) {
      const action = validatorAction as types.UpdateDomainValidationAction;

      // DomainValidator의 검증 결과를 갱신한다.
      yield fork(handleUpdateDomainValidation, action);

      // 갱신될 때까지 기다린다.
      yield call(
        functions.waitWithTimeout,
        call(functions.waitSetDomainValidation, validatorID),
        5000,
        "[validatorFlow] DomainValidator의 검증 결과가 갱신되지 않았습니다."
      );

      // DomainValidator와 하위 Validator의 검증 결과를 합산한다.
      yield fork(handleCombineValidation, validatorID);

      // 합산될 때까지 기다린다.
      yield call(
        functions.waitWithTimeout,
        call(functions.waitCombineValidation, validatorID),
        5000,
        "[validatorFlow] 검증 결과를 합산하는 데 실패하였습니다."
      );

      // 상위 Validator에 하위 Validator의 검증 결과 갱신을 요청한다.
      if (!!top) {
        yield put(internal.updateSubValidation({ validatorID: top }));
      }
    }

    // 3-2. 하위 Validator의 검증 결과 갱신 요청
    if (validatorAction.type === SagaActionTypes.SAGA_UPDATE_SUB_VALIDATION) {
      const action: types.UpdateSubValidationAction = validatorAction;
      const validator: types.Validator = yield select(
        types.validatorSelector(validatorID)
      );

      // 하위 Validator를 설정하지 않은 경우 넘어간다.
      if (!validator?.subPattern) {
        continue;
      }

      // 하위 Validator의 검증 결과를 갱신한다.
      yield fork(handleUpdateSubValidation, action);

      // 갱신될 때까지 기다린다.
      yield call(
        functions.waitWithTimeout,
        call(functions.waitSetSubValidation, validatorID),
        5000,
        "[validatorFlow] 하위 Validator의 검증 결과가 갱신되지 않았습니다."
      );

      // DomainValidator와 하위 Validator의 검증 결과를 합산한다.
      yield fork(handleCombineValidation, validatorID);

      // 합산될 때까지 기다린다.
      yield call(
        functions.waitWithTimeout,
        call(functions.waitCombineValidation, validatorID),
        5000,
        "[validatorFlow] 검증 결과를 합산하는 데 실패하였습니다."
      );

      // 상위 Validator에 하위 Validator의 검증 결과 갱신을 요청한다.
      if (!!top) {
        yield put(internal.updateSubValidation({ validatorID: top }));
      }
    }

    // 3-3. Validator 삭제 요청
    if (validatorAction.type === SagaActionTypes.SAGA_REMOVE_VALIDATOR) {
      const action: types.RemoveValidatorAction = validatorAction;

      // 삭제 요청을 보낸다.
      yield fork(handleRemoveValidator, action);

      // 제대로 삭제되었는지 확인한다.
      yield call(
        functions.waitWithTimeout,
        call(functions.waitRemoveValidator, validatorID),
        5000,
        "[validatorFlow] Validator를 삭제하는 데 실패하였습니다."
      );

      // 이 루프를 종료한다.
      break;
    }

    // 3-4. 하위 Validator 추가 요청
    if (validatorAction.type === SagaActionTypes.SAGA_ADD_SUB_VALIDATOR) {
      const action = validatorAction as types.AddSubValidatorAction;

      // 하위 Validator가 추가될 때까지 기다린다.
      yield all([
        put(internal.addSubValidator(action.payload)),
        call(
          functions.waitWithTimeout,
          call(functions.waitAddSubValidator, validatorID),
          5000,
          "[validatorFlow] 하위 Validator를 추가하는 데 실패하였습니다."
        ),
      ]);

      yield put(internal.updateSubValidation({ validatorID }));
    }

    // 3-5. 하위 Validator 삭제 요청
    if (validatorAction.type === SagaActionTypes.SAGA_REMOVE_SUB_VALIDATOR) {
      const action = validatorAction as types.RemoveSubValidatorAction;

      // 하위 Validator가 삭제될 때까지 기다린다.
      yield all([
        put(internal.removeSubValidator(action.payload)),
        call(
          functions.waitWithTimeout,
          call(functions.waitRemoveSubValidator, validatorID),
          5000,
          "[validatorFlow] 하위 Validator를 삭제하는 데 실패하였습니다."
        ),
      ]);

      yield put(internal.updateSubValidation({ validatorID }));
    }
  }
};

export default function* validationSaga() {
  yield all([
    takeEvery(SagaActionTypes.SAGA_REGISTER_VALIDATOR, validatorFlow),
  ]);
}
