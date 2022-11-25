import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as Map from "../../other/index_signature";
import {
  UntypedValidationResponse,
  Validation,
} from "../../validators/validator.type";

const REDUCER_NAME = "validation";

type ValidationContainer = { [validatorID: string]: Validation };
type ValidationDependencies = { [validatorID: string]: Array<string> };

interface ValidationState {
  data: ValidationContainer;
  dependencies: ValidationDependencies;

  refresh: Array<string>;
}

const initialState: ValidationState = {
  data: {},
  dependencies: {},
  refresh: [],
};

const validationSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    reset: () => initialState,
    addValidation: (state, action: PayloadAction<{ validatorID: string, validation: UntypedValidationResponse }>) => {
      Map.replace(state.data, action.payload.validatorID, (validation) => ({
        ...action.payload.validation,
        version: 1 + (validation?.version || 0),
      }));
    },
    removeValidation: (state, action: PayloadAction<{ validatorID: string }>) => {
      Map.remove(state.data, action.payload.validatorID);
      Map.remove(state.dependencies, action.payload.validatorID);
      state.refresh = state.refresh.filter(
        (validatorID) => validatorID !== action.payload.validatorID
      );
    },
    addRefresh: (state, action: PayloadAction<{ validatorID: string }>) => {
      state.refresh.push(action.payload.validatorID);
    },
    removeRefresh: (state, action: PayloadAction<{ validatorID: string }>) => {
      state.refresh = state.refresh.filter(
        (validatorID) => validatorID !== action.payload.validatorID
      );
    },
    addDependency: (state, action: PayloadAction<{ validatorID: string, dependedValidatorID: string }>) => {
      Map.replace(
        state.dependencies,
        action.payload.validatorID,
        (dependencies) =>
          dependencies?.concat(action.payload.dependedValidatorID) || [
            action.payload.dependedValidatorID,
          ]
      );
    },
    removeDependency: (
      state,
      action: PayloadAction<{ validatorID: string, dependencies: Array<string> }>
    ) => {
      Map.replace(
        state.dependencies,
        action.payload.validatorID,
        (dependencies) =>
          dependencies?.filter(
            (dependency) => !action.payload.dependencies.includes(dependency)
          ) || []
      );
    },
  },
});

export const {
  reset,
  addValidation,
  removeValidation,
  addRefresh,
  removeRefresh,
  addDependency,
  removeDependency,
} = validationSlice.actions;
export { REDUCER_NAME };
export type { ValidationState, ValidationContainer, ValidationDependencies };
export default validationSlice.reducer;
