import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";
import * as Map from "../other/data-structure/index-signature-map";

import * as Array from "../other/data-structure/optional-array";
import { COPY_NOTHING } from "../other/data-structure/options";
import { Validation, ValidatorInfo } from "../validators/validator.type";

export const REDUCER_NAME = "validation";

export type Validators = { [validatorID: string]: ValidatorInfo };
export type ValidationContainer = { [validatorID: string]: Validation };
export type SubValidators = { [validatorID: string]: Array<string> };

export interface ValidationState {
  data: ValidationContainer;
  subs: SubValidators;
  validators: Validators;
}

const initialState: ValidationState = {
  data: {},
  subs: {},
  validators: {},
};

// Saga 로직에서 받는 요청
export const SagaActionTypes = {
  SAGA_REGISTER_VALIDATOR: `${REDUCER_NAME}/SAGA_REGISTER_VALIDATOR`,

  SAGA_ADD_SUB_VALIDATOR: `${REDUCER_NAME}/SAGA_ADD_SUB_VALIDATOR`,
  SAGA_REMOVE_SUB_VALIDATOR: `${REDUCER_NAME}/SAGA_REMOVE_SUB_VALIDATOR`,
  SAGA_UPDATE_VALIDATION: `${REDUCER_NAME}/SAGA_UPDATE_VALIDATION`,
  SAGA_REMOVE_VALIDATOR: `${REDUCER_NAME}/SAGA_REMOVE_VALIDATOR`,
} as const;

// Reducer 요청
export const ReducerActionTypes = {
  CLEAR: `${REDUCER_NAME}/CLEAR`,
  SET_VALIDATION: `${REDUCER_NAME}/SET_VALIDATION`,
  REMOVE_VALIDATION: `${REDUCER_NAME}/REMOVE_VALIDATION`,

  ADD_SUB_VALIDATOR: `${REDUCER_NAME}/ADD_SUB_VALIDATOR`,
  REMOVE_SUB_VALIDATOR: `${REDUCER_NAME}/REMOVE_SUB_VALIDATOR`,
  CLEAR_SUB_VALIDATORS: `${REDUCER_NAME}/CLEAR_SUB_VALIDATORS`,

  REGISTER_VALIDATOR: `${REDUCER_NAME}/REGISTER_VALIDATOR`,
  REMOVE_VALIDATOR: `${REDUCER_NAME}/REMOVE_VALIDATOR`,
} as const;

// hook 또는 외부 로직에서의 요청
export const Actions = {
  updateValidation: createAction<{
    validatorID: string;
    validation?: Validation;
  }>(SagaActionTypes.SAGA_UPDATE_VALIDATION),

  registerValidator: createAction<{ validatorID: string; data: ValidatorInfo }>(
    SagaActionTypes.SAGA_REGISTER_VALIDATOR
  ),

  removeValidator: createAction<{ validatorID: string }>(
    SagaActionTypes.SAGA_REMOVE_VALIDATOR
  ),
} as const;

// saga 로직 등 내부 로직에서의 요청
export const InternalActions = {
  clear: createAction<{ prefix: string }>(ReducerActionTypes.CLEAR),

  setValidation: createAction<{
    validatorID: string;
    validation: Validation;
  }>(ReducerActionTypes.SET_VALIDATION),

  removeValidation: createAction<{
    validatorID: string;
  }>(ReducerActionTypes.REMOVE_VALIDATION),

  addSubValidator: createAction<{
    validatorID: string;
    subValidatorID: string;
  }>(ReducerActionTypes.ADD_SUB_VALIDATOR),

  removeSubValidator: createAction<{
    validatorID: string;
    subValidatorID: string;
  }>(ReducerActionTypes.REMOVE_SUB_VALIDATOR),

  clearSubValidators: createAction<{
    validatorID: string;
  }>(ReducerActionTypes.CLEAR_SUB_VALIDATORS),

  registerValidator: createAction<{ data: ValidatorInfo }>(
    ReducerActionTypes.REGISTER_VALIDATOR
  ),

  removeValidator: createAction<{ validatorID: string }>(
    ReducerActionTypes.REMOVE_VALIDATOR
  ),

  requestAddSubValidator: createAction<{
    validatorID: string;
    subValidatorID: string;
  }>(SagaActionTypes.SAGA_ADD_SUB_VALIDATOR),

  requestRemoveSubValidator: createAction<{
    validatorID: string;
    subValidatorID: string;
  }>(SagaActionTypes.SAGA_REMOVE_SUB_VALIDATOR),
} as const;

const validatorIDFn = (_: RootState, validatorID: string) => validatorID;
const dataSelector = (state: RootState) => state.validation.data;
const subsSelector = (state: RootState) => state.validation.subs;
const validatorSelector = (state: RootState) => state.validation.validators;

export const DynamicSelectors = {
  DATA: () =>
    createSelector(
      [dataSelector, validatorIDFn],
      (data, validatorID) => data[validatorID]
    ),

  SUBS: () =>
    createSelector(
      [subsSelector, validatorIDFn],
      (subs, validatorID) => subs[validatorID]
    ),

  INFO: () =>
    createSelector(
      [validatorSelector, validatorIDFn],
      (validators, validatorID) => validators[validatorID]
    ),
} as const;

const validationReducer = createReducer(initialState, {
  [ReducerActionTypes.CLEAR]: (
    state,
    action: ReturnType<typeof InternalActions.clear>
  ) => {
    const validatorIDs = Object.keys(state.validators).filter((validatorID) =>
      validatorID.startsWith(action.payload.prefix)
    );

    Map.removeAll(state.data, validatorIDs, COPY_NOTHING);
    Map.removeAll(state.subs, validatorIDs, COPY_NOTHING);
    Map.removeAll(state.validators, validatorIDs, COPY_NOTHING);
  },
  [ReducerActionTypes.SET_VALIDATION]: (
    state,
    action: ReturnType<typeof InternalActions.setValidation>
  ) => {
    Map.put(
      state.data,
      action.payload.validatorID,
      action.payload.validation,
      COPY_NOTHING
    );
  },

  [ReducerActionTypes.REMOVE_VALIDATION]: (
    state,
    action: ReturnType<typeof InternalActions.removeValidation>
  ) => {
    Map.removeAll(state.data, [action.payload.validatorID], COPY_NOTHING);
  },

  [ReducerActionTypes.REGISTER_VALIDATOR]: (
    state,
    action: ReturnType<typeof InternalActions.registerValidator>
  ) => {
    Map.put(
      state.validators,
      action.payload.data.validatorID,
      action.payload.data,
      COPY_NOTHING
    );
  },

  [ReducerActionTypes.REMOVE_VALIDATOR]: (
    state,
    action: ReturnType<typeof InternalActions.removeValidator>
  ) => {
    Map.remove(state.validators, action.payload.validatorID, COPY_NOTHING);
  },

  [ReducerActionTypes.ADD_SUB_VALIDATOR]: (
    state,
    action: ReturnType<typeof InternalActions.addSubValidator>
  ) => {
    Map.replace(
      state.subs,
      action.payload.validatorID,
      (subs) => Array.push(action.payload.subValidatorID, subs, COPY_NOTHING),
      COPY_NOTHING
    );
  },

  [ReducerActionTypes.REMOVE_SUB_VALIDATOR]: (
    state,
    action: ReturnType<typeof InternalActions.removeSubValidator>
  ) => {
    Map.replace(
      state.subs,
      action.payload.validatorID,
      (subs) =>
        Array.removeAll(
          (sub) => action.payload.subValidatorID === sub,
          subs,
          COPY_NOTHING
        ),
      COPY_NOTHING
    );
  },

  [ReducerActionTypes.CLEAR_SUB_VALIDATORS]: (
    state,
    action: ReturnType<typeof InternalActions.clearSubValidators>
  ) => {
    Map.remove(state.subs, action.payload.validatorID, COPY_NOTHING);
  },
});

export default validationReducer;
