import * as types from "./validation.type";
import { CallEffect, delay, race, take } from "redux-saga/effects";
import { ReducerActionTypes } from "../../reducers/validation";

// Timeout Function
export const waitWithTimeout = function* (
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
export const waitDispatch = function* <T>(
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

export const waitRegisterValidator = (validatorID: string) =>
  waitDispatch<types.RegisterValidatorDispatch>(
    validatorID,
    ReducerActionTypes.REGISTER_VALIDATOR,
    (action) => action.payload.data.validatorID
  );

export const waitSetDomainValidation = (validatorID: string) =>
  waitDispatch<types.SetDomainValidationDispatch>(
    validatorID,
    ReducerActionTypes.SET_DOMAIN_VALIDATION,
    (action) => action.payload.validatorID
  );

export const waitSetSubValidation = (validatorID: string) =>
  waitDispatch<types.SetSubValidationDispatch>(
    validatorID,
    ReducerActionTypes.SET_SUB_VALIDATION,
    (action) => action.payload.validatorID
  );

export const waitCombineValidation = (validatorID: string) =>
  waitDispatch<types.CombineValidationDispatch>(
    validatorID,
    ReducerActionTypes.COMBINE_VALIDATION,
    (action) => action.payload.validatorID
  );

export const waitRemoveValidator = (validatorID: string) =>
  waitDispatch<types.RemoveValidatorDispatch>(
    validatorID,
    ReducerActionTypes.REMOVE_VALIDATOR,
    (action) => action.payload.validatorID
  );

export const waitAddSubValidator = (validatorID: string) =>
  waitDispatch<types.AddSubValidatorDispatch>(
    validatorID,
    ReducerActionTypes.ADD_SUB_VALIDATOR,
    (action) => action.payload.validatorID
  );

export const waitRemoveSubValidator = (validatorID: string) =>
  waitDispatch<types.RemoveSubValidatorDispatch>(
    validatorID,
    ReducerActionTypes.REMOVE_SUB_VALIDATOR,
    (action) => action.payload.validatorID
  );
