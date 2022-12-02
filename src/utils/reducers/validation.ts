import { createAction, createReducer } from "@reduxjs/toolkit";
import * as Map from "../other/data-structure/index-signature-map";

import * as Array from "../other/data-structure/optional-array";
import {
  CopyNothing,
  CopyOptionSignatures,
} from "../other/data-structure/options";
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

export const ActionTypes = {
  SET_VALIDATION: `${REDUCER_NAME}/SET_VALIDATION`,
  REMOVE_VALIDATION: `${REDUCER_NAME}/REMOVE_VALIDATION`,

  ADD_SUB_VALIDATOR: `${REDUCER_NAME}/ADD_SUB_VALIDATOR`,
  REMOVE_SUB_VALIDATOR: `${REDUCER_NAME}/REMOVE_SUB_VALIDATOR`,
  CLEAR_SUB_VALIDATORS: `${REDUCER_NAME}/CLEAR_SUB_VALIDATORS`,

  REGISTER_VALIDATOR: `${REDUCER_NAME}/REGISTER_VALIDATOR`,
  REMOVE_VALIDATOR: `${REDUCER_NAME}/REMOVE_VALIDATOR`,

  SAGA_REGISTER_VALIDATOR: `${REDUCER_NAME}/SAGA_REGISTER_VALIDATOR`,

  SAGA_ADD_SUB_VALIDATOR: `${REDUCER_NAME}/SAGA_ADD_SUB_VALIDATOR`,
  SAGA_REMOVE_SUB_VALIDATOR: `${REDUCER_NAME}/SAGA_REMOVE_SUB_VALIDATOR`,
  SAGA_UPDATE_VALIDATION: `${REDUCER_NAME}/SAGA_UPDATE_VALIDATION`,
  SAGA_REMOVE_VALIDATOR: `${REDUCER_NAME}/SAGA_REMOVE_VALIDATOR`,
} as const;

export const InternalActions = {
  // For Reducer
  setValidation: createAction<{
    validatorID: string;
    validation: Validation;
  }>(ActionTypes.SET_VALIDATION),

  removeValidation: createAction<{
    validatorID: string;
  }>(ActionTypes.REMOVE_VALIDATION),

  addSubValidator: createAction<{
    validatorID: string;
    subValidatorID: string;
  }>(ActionTypes.ADD_SUB_VALIDATOR),

  removeSubValidator: createAction<{
    validatorID: string;
    subValidatorID: string;
  }>(ActionTypes.REMOVE_SUB_VALIDATOR),

  clearSubValidators: createAction<{
    validatorID: string;
  }>(ActionTypes.CLEAR_SUB_VALIDATORS),

  registerValidator: createAction<{ data: ValidatorInfo }>(
    ActionTypes.REGISTER_VALIDATOR
  ),

  removeValidator: createAction<{ validatorID: string }>(
    ActionTypes.REMOVE_VALIDATOR
  ),

  // For Saga
  sagaAddSubValidator: createAction<{
    validatorID: string;
    subValidatorID: string;
  }>(ActionTypes.SAGA_ADD_SUB_VALIDATOR),

  sagaRemoveSubValidator: createAction<{
    validatorID: string;
    subValidatorID: string;
  }>(ActionTypes.SAGA_REMOVE_SUB_VALIDATOR),
} as const;

export const Actions = {
  // For Saga
  updateValidation: createAction<{
    validatorID: string;
    validation?: Validation;
  }>(ActionTypes.SAGA_UPDATE_VALIDATION),

  registerValidator: createAction<{ validatorID: string; data: ValidatorInfo }>(
    ActionTypes.SAGA_REGISTER_VALIDATOR
  ),

  removeValidator: createAction<{ validatorID: string }>(
    ActionTypes.SAGA_REMOVE_VALIDATOR
  ),
} as const;

const option: CopyNothing = { type: CopyOptionSignatures.COPY_NOTHING };

const validationReducer = createReducer(initialState, {
  [ActionTypes.SET_VALIDATION]: (
    state,
    action: ReturnType<typeof InternalActions.setValidation>
  ) => {
    Map.put(
      state.data,
      action.payload.validatorID,
      action.payload.validation,
      option
    );
  },

  [ActionTypes.REMOVE_VALIDATION]: (
    state,
    action: ReturnType<typeof InternalActions.removeValidation>
  ) => {
    Map.removeAll(state.data, [action.payload.validatorID], option);
  },

  [ActionTypes.REGISTER_VALIDATOR]: (
    state,
    action: ReturnType<typeof InternalActions.registerValidator>
  ) => {
    Map.put(
      state.validators,
      action.payload.data.validatorID,
      action.payload.data,
      option
    );
  },

  [ActionTypes.REMOVE_VALIDATOR]: (
    state,
    action: ReturnType<typeof InternalActions.removeValidator>
  ) => {
    Map.remove(state.validators, action.payload.validatorID, option);
  },

  [ActionTypes.ADD_SUB_VALIDATOR]: (
    state,
    action: ReturnType<typeof InternalActions.addSubValidator>
  ) => {
    Map.replace(
      state.subs,
      action.payload.validatorID,
      (subs) => Array.push(action.payload.subValidatorID, subs, option),
      option
    );
  },

  [ActionTypes.REMOVE_SUB_VALIDATOR]: (
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
          option
        ),
      option
    );
  },

  [ActionTypes.CLEAR_SUB_VALIDATORS]: (
    state,
    action: ReturnType<typeof InternalActions.clearSubValidators>
  ) => {
    Map.remove(state.subs, action.payload.validatorID, option);
  },
});

export default validationReducer;
