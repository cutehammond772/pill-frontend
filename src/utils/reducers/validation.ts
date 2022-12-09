import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";

import * as map from "../other/data-structure/index-signature-map";
import { CopyOptions } from "../other/data-structure/options";
import * as array from "../other/data-structure/smart-array";

import {
  Validation,
  ValidationResult,
  ValidatorInfo,
} from "../validators/validator.type";

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
  SAGA_REMOVE_VALIDATOR: `${REDUCER_NAME}/SAGA_REMOVE_VALIDATOR`,

  SAGA_UPDATE_DOMAIN_VALIDATION: `${REDUCER_NAME}/SAGA_UPDATE_DOMAIN_VALIDATION`,
  SAGA_UPDATE_SUB_VALIDATION: `${REDUCER_NAME}/SAGA_UPDATE_SUB_VALIDATION`,
} as const;

// Reducer 요청
export const ReducerActionTypes = {
  CLEAR: `${REDUCER_NAME}/CLEAR`,
  REMOVE_VALIDATION: `${REDUCER_NAME}/REMOVE_VALIDATION`,

  ADD_SUB_VALIDATOR: `${REDUCER_NAME}/ADD_SUB_VALIDATOR`,
  REMOVE_SUB_VALIDATOR: `${REDUCER_NAME}/REMOVE_SUB_VALIDATOR`,
  CLEAR_SUB_VALIDATORS: `${REDUCER_NAME}/CLEAR_SUB_VALIDATORS`,

  REGISTER_VALIDATOR: `${REDUCER_NAME}/REGISTER_VALIDATOR`,
  REMOVE_VALIDATOR: `${REDUCER_NAME}/REMOVE_VALIDATOR`,

  SET_DOMAIN_VALIDATION: `${REDUCER_NAME}/SET_DOMAIN_VALIDATION`,
  SET_SUB_VALIDATION: `${REDUCER_NAME}/SET_SUB_VALIDATION`,
  
  COMBINE_VALIDATION: `${REDUCER_NAME}/COMBINE_VALIDATION`,
} as const;

// hook 또는 외부 로직에서의 요청
export const Actions = {
  // DomainValidator의 검증 결과 갱신 요청
  updateDomainValidation: createAction<{
    validatorID: string;
    result: ValidationResult;
  }>(SagaActionTypes.SAGA_UPDATE_DOMAIN_VALIDATION),

  // Validator 등록 요청
  registerValidator: createAction<{ validatorID: string; data: ValidatorInfo }>(
    SagaActionTypes.SAGA_REGISTER_VALIDATOR
  ),

  // Validator 삭제 요청
  removeValidator: createAction<{ validatorID: string }>(
    SagaActionTypes.SAGA_REMOVE_VALIDATOR
  ),
} as const;

// saga 로직 등 내부 로직에서의 요청
export const InternalActions = {
  clear: createAction<{ prefix: string }>(ReducerActionTypes.CLEAR),

  // 하위 Validator의 검증 결과 갱신 요청
  updateSubValidation: createAction<{
    validatorID: string;
  }>(SagaActionTypes.SAGA_UPDATE_SUB_VALIDATION),

  setDomainValidation: createAction<{
    validatorID: string;
    result: ValidationResult;
  }>(ReducerActionTypes.SET_DOMAIN_VALIDATION),

  setSubValidation: createAction<{
    validatorID: string;
    result: ValidationResult;
  }>(ReducerActionTypes.SET_SUB_VALIDATION),

  combineValidation: createAction<{
    validatorID: string;
    result: ValidationResult;
  }>(ReducerActionTypes.COMBINE_VALIDATION),

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

    state.data = map.remove(state.data)(...validatorIDs);
    state.subs = map.remove(state.subs)(...validatorIDs);
    state.validators = map.remove(state.validators)(...validatorIDs);
  },

  [ReducerActionTypes.SET_DOMAIN_VALIDATION]: (
    state,
    action: ReturnType<typeof InternalActions.setDomainValidation>
  ) =>
    void map.replace(state.data, CopyOptions.COPY_NOTHING)((result) => {
      if (!result) {
        return { valid: false, messages: [] };
      }

      result.domain = action.payload.result;

      return result;
    }, action.payload.validatorID),

  [ReducerActionTypes.SET_SUB_VALIDATION]: (
    state,
    action: ReturnType<typeof InternalActions.setSubValidation>
  ) =>
    void map.replace(state.data, CopyOptions.COPY_NOTHING)((result) => {
      if (!result) {
        return { valid: false, messages: [] };
      }

      result.sub = action.payload.result;

      return result;
    }, action.payload.validatorID),

  [ReducerActionTypes.COMBINE_VALIDATION]: (
    state,
    action: ReturnType<typeof InternalActions.combineValidation>
  ) =>
    void map.replace(state.data, CopyOptions.COPY_NOTHING)((result) => {
      if (!result) {
        return { valid: false, messages: [] };
      }

      result.valid = action.payload.result.valid;
      result.messages = action.payload.result.messages;

      return result;
    }, action.payload.validatorID),

  [ReducerActionTypes.REMOVE_VALIDATION]: (
    state,
    action: ReturnType<typeof InternalActions.removeValidation>
  ) => void (state.data = map.remove(state.data)(action.payload.validatorID)),

  [ReducerActionTypes.REGISTER_VALIDATOR]: (
    state,
    action: ReturnType<typeof InternalActions.registerValidator>
  ) =>
    void map.put(state.validators, CopyOptions.COPY_NOTHING)(
      action.payload.data.validatorID,
      action.payload.data
    ),

  [ReducerActionTypes.REMOVE_VALIDATOR]: (
    state,
    action: ReturnType<typeof InternalActions.removeValidator>
  ) =>
    void (state.validators = map.remove(state.validators)(
      action.payload.validatorID
    )),

  [ReducerActionTypes.ADD_SUB_VALIDATOR]: (
    state,
    action: ReturnType<typeof InternalActions.addSubValidator>
  ) =>
    void map.replace(state.subs, CopyOptions.COPY_NOTHING)(
      (subs) =>
        array.push(
          subs,
          CopyOptions.COPY_NOTHING
        )(action.payload.subValidatorID),
      action.payload.validatorID
    ),

  [ReducerActionTypes.REMOVE_SUB_VALIDATOR]: (
    state,
    action: ReturnType<typeof InternalActions.removeSubValidator>
  ) =>
    void map.replace(state.subs, CopyOptions.COPY_NOTHING)(
      (subs) =>
        array.remove(subs)((sub) => action.payload.subValidatorID === sub),
      action.payload.validatorID
    ),

  [ReducerActionTypes.CLEAR_SUB_VALIDATORS]: (
    state,
    action: ReturnType<typeof InternalActions.clearSubValidators>
  ) => void (state.subs = map.remove(state.subs)(action.payload.validatorID)),
});

export default validationReducer;
