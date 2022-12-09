import { RootState } from "../../reducers";
import { Validation, ValidatorInfo } from "../../validators/validator.type";
import {
  InternalActions as internal,
  Actions as actions,
} from "../../reducers/validation";

export const validatorSelector = (validatorID: string) => (state: RootState) =>
  state.validation.validators[validatorID];

export const subsSelector = (validatorID: string) => (state: RootState) =>
  state.validation.subs[validatorID];

export const validationSelector = (validatorID: string) => (state: RootState) =>
  state.validation.data[validatorID];

// yield를 통해 얻는 객체는 타입을 알 수 없으므로 타입 체크를 위해 따로 만들어졌다.
export type Validator = ValidatorInfo | undefined;

export type Subs = Array<string> | undefined;

export type Response = Validation | undefined;

// redux store에 디스패치하는 액션이 아닌 saga 액션을 나타낸다.
export type RegisterValidatorAction = ReturnType<
  typeof actions.registerValidator
>;

export type RemoveValidatorAction = ReturnType<typeof actions.removeValidator>;

export type AddSubValidatorAction = ReturnType<
  typeof internal.requestAddSubValidator
>;

export type RemoveSubValidatorAction = ReturnType<
  typeof internal.requestRemoveSubValidator
>;

export type UpdateDomainValidationAction = ReturnType<
  typeof actions.updateDomainValidation
>;

export type UpdateSubValidationAction = ReturnType<
  typeof internal.updateSubValidation
>;

// 디스패치 액션을 나타낸다.
export type RegisterValidatorDispatch = ReturnType<
typeof internal.registerValidator
>;

export type RemoveValidatorDispatch = ReturnType<
typeof internal.removeValidator
>;

export type AddSubValidatorDispatch = ReturnType<
typeof internal.addSubValidator
>;

export type RemoveSubValidatorDispatch = ReturnType<
  typeof internal.removeSubValidator
>;

export type SetDomainValidationDispatch = ReturnType<
  typeof internal.setDomainValidation
>;

export type SetSubValidationDispatch = ReturnType<
  typeof internal.setSubValidation
>;

export type CombineValidationDispatch = ReturnType<
  typeof internal.combineValidation
>;
