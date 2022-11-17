import { Reducer } from "redux";
import { DEFAULT_ID } from "../../validators/validator.type";
import {
  INITIAL_STATE,
  UpdateValidationProps,
  SignatureProps,
  ValidationData,
  ValidationReducingType,
} from "./validation.type";

const registerValidation = (props: SignatureProps) => ({
  type: ValidationReducingType.REGISTER,
  ...props,
});

const updateValidation = (props: UpdateValidationProps) => ({
  type: ValidationReducingType.UPDATE,
  ...props,
});

const resetValidation = () => ({
  type: ValidationReducingType.RESET,
});

type ValidationReducingAction =
  | ReturnType<typeof registerValidation>
  | ReturnType<typeof updateValidation>
  | ReturnType<typeof resetValidation>;

const validationReducer: Reducer<ValidationData, ValidationReducingAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case ValidationReducingType.REGISTER:
      state.data[action.signature] = {};
      return state;
    case ValidationReducingType.UPDATE:
      state.data[action.signature][action.id || DEFAULT_ID] = action.result;
      return state;
    case ValidationReducingType.RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { validationReducer, registerValidation, updateValidation, resetValidation };
