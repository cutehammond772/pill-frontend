import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as Map from "../other/data-structure/index-signature-map";
import {
  UntypedValidationResponse,
  Validation,
} from "../validators/validator.type";

import * as Array from "../other/data-structure/optional-array";
import {
  CopyNothing,
  CopyOptionSignatures,
} from "../other/data-structure/options";

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

const option: CopyNothing = { type: CopyOptionSignatures.COPY_NOTHING };

const validationSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    reset: () => initialState,

    addValidation: (
      state,
      action: PayloadAction<{
        validatorID: string;
        validation: UntypedValidationResponse;
      }>
    ) => {
      Map.replace(
        state.data,
        action.payload.validatorID,
        (validation) => ({
          ...action.payload.validation,
          version: 1 + (validation?.version || 0),
        }),
        option
      );
    },

    removeValidation: (
      state,
      action: PayloadAction<{ validatorID: string }>
    ) => {
      Map.remove(state.data, action.payload.validatorID, option);
      Map.remove(state.dependencies, action.payload.validatorID, option);
      Array.removeAll(
        (validatorID) => validatorID !== action.payload.validatorID,
        state.refresh,
        option
      );
    },

    addRefresh: (state, action: PayloadAction<{ validatorID: string }>) => {
      Array.push(action.payload.validatorID, state.refresh, option);
    },

    removeRefresh: (state, action: PayloadAction<{ validatorID: string }>) => {
      Array.removeAll(
        (validatorID) => validatorID !== action.payload.validatorID,
        state.refresh,
        option
      );
    },

    addDependency: (
      state,
      action: PayloadAction<{
        validatorID: string;
        dependedValidatorID: string;
      }>
    ) => {
      Map.replace(
        state.dependencies,
        action.payload.validatorID,
        (dependencies) =>
          Array.push(action.payload.dependedValidatorID, dependencies, option),
        option
      );
    },

    removeDependency: (
      state,
      action: PayloadAction<{
        validatorID: string;
        dependencies: Array<string>;
      }>
    ) => {
      Map.replace(
        state.dependencies,
        action.payload.validatorID,
        (dependencies) =>
          Array.removeAll(
            (dependency) => !action.payload.dependencies.includes(dependency),
            dependencies,
            option
          ),
        option
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
