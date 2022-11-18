import { Validated } from "../../validators/validator.type";

const ValidationReducingType = {
  REGISTER: "reducer.validation.REGISTER",
  UPDATE: "reducer.validation.UPDATE",
  RESET: "reducer.validation.RESET",

  ADD_REFRESH: "reducer.validation.ADD_REFRESH",
  REMOVE_REFRESH: "reducer.validation.REMOVE_REFRESH",
} as const;

type ValidationIds = { [id: string]: StoredValidationResult };
type ValidationContainer = { [signature: string]: ValidationIds };

interface ValidationData {
  data: ValidationContainer;
  refresh: Array<string>,
}

const INITIAL_STATE: ValidationData = {
  data: {},
  refresh: [],
};

interface StoredValidationResult {
  result: Validated;
  messages: Array<string>;
}

export { INITIAL_STATE, ValidationReducingType };
export type {
  ValidationIds,
  ValidationContainer,
  ValidationData,
  StoredValidationResult,
};
