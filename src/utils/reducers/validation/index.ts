import { Reducer } from "redux";
import { DEFAULT_ID } from "../../validators/validator.type";
import {
  INITIAL_STATE,
  ValidationData,
  ValidationReducingType,
  ValidationContainer,
  ValidationIds,
  StoredValidationResult,
} from "./validation.type";

const registerValidation = (props: { signature: string }) => ({
  type: ValidationReducingType.REGISTER,
  ...props,
});

const updateValidation = (props: {
  id?: string;
  signature: string;
  result: StoredValidationResult;
}) => ({
  type: ValidationReducingType.UPDATE,
  ...props,
});

const resetValidation = () => ({
  type: ValidationReducingType.RESET,
});

const addRefreshValidator = (props: { id?: string; signature: string }) => ({
  type: ValidationReducingType.ADD_REFRESH,
  ...props,
});

const removeRefreshValidator = (props: { id?: string; signature: string }) => ({
  type: ValidationReducingType.REMOVE_REFRESH,
  ...props,
});

type ValidationReducingAction =
  | ReturnType<typeof registerValidation>
  | ReturnType<typeof updateValidation>
  | ReturnType<typeof resetValidation>
  | ReturnType<typeof addRefreshValidator>
  | ReturnType<typeof removeRefreshValidator>;

const copyStoredValidationResult = (data: StoredValidationResult) => ({
  ...data,
  messages: [...data.messages],
});

const copyValidationIds = (data: ValidationIds) => {
  return Object.keys(data).reduce((acc, id) => {
    acc[id] = copyStoredValidationResult(data[id]);
    return acc;
  }, {} as ValidationIds);
};

const copy = (data: ValidationData) => {
  const copiedData = Object.keys(data.data).reduce((acc, signature) => {
    acc[signature] = copyValidationIds(data.data[signature]);
    return acc;
  }, {} as ValidationContainer);

  return {
    ...data,
    refresh: [...data.refresh],
    data: copiedData,
  };
};

const validationReducer: Reducer<ValidationData, ValidationReducingAction> = (
  state = INITIAL_STATE,
  action
) => {
  const copied = copy(state);

  switch (action.type) {
    case ValidationReducingType.REGISTER:
      return {
        ...copied,
        data: { ...copied.data, [action.signature]: {} },
      };
    case ValidationReducingType.UPDATE:
      return {
        ...copied,
        data: {
          ...copied.data,
          [action.signature]: {
            ...copied.data[action.signature],
            [action.id || DEFAULT_ID]: action.result,
          },
        },
      };
    case ValidationReducingType.RESET:
      return INITIAL_STATE;
    case ValidationReducingType.ADD_REFRESH:
      return {
        ...copied,
        refresh: copied.refresh.concat(`${action.signature}:${action.id || DEFAULT_ID}`),
      };
    case ValidationReducingType.REMOVE_REFRESH:
      return {
        ...copied,
        refresh: copied.refresh.filter(
          (vid) => vid !== `${action.signature}:${action.id || DEFAULT_ID}`
        ),
      };
    default:
      return state;
  }
};

export {
  validationReducer,
  registerValidation,
  updateValidation,
  resetValidation,
  addRefreshValidator,
  removeRefreshValidator,
};
