import { Validation } from "../../validators/validator.type";

const ValidationReducingType = {
  ADD: "reducer.validation.ADD",
  REMOVE: "reducer.validation.REMOVE",
  RESET: "reducer.validation.RESET",
  
  ADD_REFRESH: "reducer.validation.ADD_REFRESH",
  REMOVE_REFRESH: "reducer.validation.REMOVE_REFRESH",

  ADD_DEPENDENCY: "reducer.validation.ADD_DEPENDENCY",
  REMOVE_DEPENDENCY: "reducer.validation.REMOVE_DEPENDENCY",
} as const;

type ValidationContainer = { [validatorID: string]: Validation };
type ValidationDependencies = { [validatorID: string]: Array<string> };

interface ValidationData {
  data: ValidationContainer;
  dependencies: ValidationDependencies,

  refresh: Array<string>,
}

const INITIAL_STATE: ValidationData = {
  data: {},
  dependencies: {},
  refresh: [],
};

export { INITIAL_STATE, ValidationReducingType };
export type {
  ValidationContainer,
  ValidationData,
  ValidationDependencies,
};
