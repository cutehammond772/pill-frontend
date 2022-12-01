import { createAction, createReducer } from "@reduxjs/toolkit";
import * as Map from "../other/data-structure/index-signature-map";

import * as Array from "../other/data-structure/optional-array";
import {
  CopyNothing,
  CopyOptionSignatures,
} from "../other/data-structure/options";
import {
  ValidationResponse,
  ValidatorInfo,
} from "../validators/validator.type";

export const REDUCER_NAME = "validation";

export type Validators = { [validatorID: string]: ValidatorInfo };
export type ValidationContainer = { [validatorID: string]: ValidationResponse };
export type ValidationDependencies = { [validatorID: string]: Array<string> };

export interface ValidationState {
  data: ValidationContainer;
  dependencies: ValidationDependencies;
  validators: Validators;
}

const initialState: ValidationState = {
  data: {},
  dependencies: {},
  validators: {},
};

export const ActionTypes = {
  SET_VALIDATION: `${REDUCER_NAME}/SET_VALIDATION`,
  REMOVE_VALIDATION: `${REDUCER_NAME}/REMOVE_VALIDATION`,

  ADD_DEPENDENCY: `${REDUCER_NAME}/ADD_DEPENDENCY`,
  REMOVE_DEPENDENCY: `${REDUCER_NAME}/REMOVE_DEPENDENCY`,
  CLEAR_DEPENDENCIES: `${REDUCER_NAME}/CLEAR_DEPENDENCIES`,

  ADD_VALIDATOR: `${REDUCER_NAME}/ADD_VALIDATOR`,
  REMOVE_VALIDATOR: `${REDUCER_NAME}/REMOVE_VALIDATOR`,

  SAGA_ADD_DEPENDENCY: `${REDUCER_NAME}/SAGA_ADD_DEPENDENCY`,
  SAGA_REMOVE_DEPENDENCY: `${REDUCER_NAME}/SAGA_REMOVE_DEPENDENCY`,

  SAGA_UPDATE_VALIDATION: `${REDUCER_NAME}/SAGA_UPDATE_VALIDATION`,

  SAGA_ADD_VALIDATOR: `${REDUCER_NAME}/SAGA_ADD_VALIDATOR`,
  SAGA_REMOVE_VALIDATOR: `${REDUCER_NAME}/SAGA_REMOVE_VALIDATOR`,
} as const;

export const InternalActions = {
  // For Reducer
  setValidation: createAction<{
    validatorID: string;
    validation: ValidationResponse;
  }>(ActionTypes.SET_VALIDATION),

  removeValidation: createAction<{
    validatorID: string;
  }>(ActionTypes.REMOVE_VALIDATION),

  addDependency: createAction<{
    validatorID: string;
    dependedValidatorID: string;
  }>(ActionTypes.ADD_DEPENDENCY),

  removeDependency: createAction<{
    validatorID: string;
    dependedValidatorID: string;
  }>(ActionTypes.REMOVE_DEPENDENCY),

  clearDependencies: createAction<{
    validatorID: string;
  }>(ActionTypes.CLEAR_DEPENDENCIES),

  addValidator: createAction<{ data: ValidatorInfo }>(
    ActionTypes.ADD_VALIDATOR
  ),

  removeValidator: createAction<{ validatorID: string }>(
    ActionTypes.REMOVE_VALIDATOR
  ),

  // For Saga
  sagaAddDependency: createAction<{
    validatorID: string;
    dependedValidatorID: string;
  }>(ActionTypes.SAGA_ADD_DEPENDENCY),

  sagaRemoveDependency: createAction<{
    validatorID: string;
    dependedValidatorID: string;
  }>(ActionTypes.SAGA_REMOVE_DEPENDENCY),
} as const;

export const Actions = {
  // For Saga
  updateValidation: createAction<{
    validatorID: string;
    response?: ValidationResponse;
  }>(ActionTypes.SAGA_UPDATE_VALIDATION),

  addValidator: createAction<{ data: ValidatorInfo }>(
    ActionTypes.SAGA_ADD_VALIDATOR
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

  [ActionTypes.ADD_VALIDATOR]: (
    state,
    action: ReturnType<typeof InternalActions.addValidator>
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

  [ActionTypes.ADD_DEPENDENCY]: (
    state,
    action: ReturnType<typeof InternalActions.addDependency>
  ) => {
    Map.replace(
      state.dependencies,
      action.payload.validatorID,
      (dependencies) =>
        Array.push(action.payload.dependedValidatorID, dependencies, option),
      option
    );
  },

  [ActionTypes.REMOVE_DEPENDENCY]: (
    state,
    action: ReturnType<typeof InternalActions.removeDependency>
  ) => {
    Map.replace(
      state.dependencies,
      action.payload.validatorID,
      (dependencies) =>
        Array.removeAll(
          (dependency) => action.payload.dependedValidatorID === dependency,
          dependencies,
          option
        ),
      option
    );
  },

  [ActionTypes.CLEAR_DEPENDENCIES]: (
    state,
    action: ReturnType<typeof InternalActions.clearDependencies>
  ) => {
    Map.remove(state.dependencies, action.payload.validatorID, option);
  },
});

export default validationReducer;
