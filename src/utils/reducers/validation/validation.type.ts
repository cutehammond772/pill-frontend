import { Validated } from "../../validators/validator.type";

const ValidationReducingType = {
  REGISTER: "reducer.validation.register",
  UPDATE: "recuder.validation.update",
  RESET: "reducer.validation.reset",
} as const;

interface ValidationData {
  data: { [signature: string]: { [id: string]: StoredValidationResult } };
}

const INITIAL_STATE: ValidationData = {
  data: {},
};

interface ValidationProps {
  signature: string;
  id: string;
  result: StoredValidationResult;
}

type SignatureProps = Pick<ValidationProps, "signature">;
type UpdateValidationProps = Pick<ValidationProps, "result" | "signature"> &
  Partial<Pick<ValidationProps, "id">>;
type AddDependencyIdProps = Pick<ValidationProps, "signature" | "id">;

interface StoredValidationResult {
  result: Validated;
  message?: string;
}

export { INITIAL_STATE, ValidationReducingType };
export type {
  ValidationData,
  StoredValidationResult,
  ValidationProps,
  SignatureProps,
  UpdateValidationProps,
  AddDependencyIdProps,
};
