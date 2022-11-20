import { Reducer } from "redux";
import {
  UntypedValidationResponse,
} from "../../validators/validator.type";
import {
  INITIAL_STATE,
  ValidationData,
  ValidationReducingType,
} from "./validation.type";

import * as Map from "../../other/index_signature";

const addValidation = (
  validation: UntypedValidationResponse,
  validatorID: string
) => ({
  type: ValidationReducingType.ADD,
  validation,
  validatorID,
});

const removeValidation = (validatorID: string) => ({
  type: ValidationReducingType.REMOVE,
  validatorID,
});

const resetValidation = () => ({
  type: ValidationReducingType.RESET,
});

const addRefresh = (validatorID: string) => ({
  type: ValidationReducingType.ADD_REFRESH,
  validatorID,
});

const removeRefresh = (validatorID: string) => ({
  type: ValidationReducingType.REMOVE_REFRESH,
  validatorID,
});

const addDependency = (validatorID: string, dependedValidatorID: string) => ({
  type: ValidationReducingType.ADD_DEPENDENCY,
  validatorID,
  dependedValidatorID,
});

const removeDependency = (
  validatorID: string,
  dependencies: Array<string>
) => ({
  type: ValidationReducingType.REMOVE_DEPENDENCY,
  validatorID,
  dependencies,
});

type ValidationReducingAction =
  | ReturnType<typeof addValidation>
  | ReturnType<typeof removeValidation>
  | ReturnType<typeof resetValidation>
  | ReturnType<typeof addRefresh>
  | ReturnType<typeof removeRefresh>
  | ReturnType<typeof addDependency>
  | ReturnType<typeof removeDependency>;

const copy = (data: ValidationData) => {
  return {
    ...data,

    data: Map.copy(data.data, (validation) => ({
      ...validation,
      messages: [...validation.messages],
    })),

    dependencies: Map.copy(data.dependencies, (ids) => [...ids]),

    refresh: [...data.refresh],
  };
};

const validationReducer: Reducer<ValidationData, ValidationReducingAction> = (
  state = INITIAL_STATE,
  action
) => {
  const copied = copy(state);

  switch (action.type) {
    case ValidationReducingType.ADD:
      return {
        ...copied,
        data: {
          ...copied.data,
          [action.validatorID]: {
            ...action.validation,
            version: copied.data[action.validatorID]?.version + 1 || 0,
          },
        },
      };
    case ValidationReducingType.REMOVE:
      return {
        ...copied,
        data: Map.remove(copied.data, action.validatorID),
        refresh: copied.refresh.filter(
          (validatorID) => validatorID !== action.validatorID
        ),
        dependencies: Map.remove(copied.dependencies, action.validatorID),
      };
    case ValidationReducingType.RESET:
      return INITIAL_STATE;
    case ValidationReducingType.ADD_REFRESH:
      return {
        ...copied,
        refresh: copied.refresh.concat(action.validatorID),
      };
    case ValidationReducingType.REMOVE_REFRESH:
      return {
        ...copied,
        refresh: copied.refresh.filter(
          (validatorID) => validatorID !== action.validatorID
        ),
      };
    case ValidationReducingType.ADD_DEPENDENCY:
      // 이미 의존 목록에 존재하는 경우
      if (
        copied.dependencies[action.validatorID]?.find(
          (validatorID) => action.dependedValidatorID === validatorID
        ) !== undefined
      ) {
        return copied;
      }

      return {
        ...copied,
        dependencies: {
          ...copied.dependencies,
          [action.validatorID]: copied.dependencies[action.validatorID]?.concat(
            action.dependedValidatorID
          ) || [action.dependedValidatorID],
        },
      };
    case ValidationReducingType.REMOVE_DEPENDENCY:
      return {
        ...copied,
        dependencies: {
          ...copied.dependencies,
          [action.validatorID]:
            copied.dependencies[action.validatorID]?.filter(
              (validatorID) => !action.dependencies.includes(validatorID)
            ) || [],
        },
      };
    default:
      return state;
  }
};

export {
  validationReducer,
  addValidation,
  removeValidation,
  resetValidation,
  addRefresh,
  removeRefresh,
  addDependency,
  removeDependency,
};
