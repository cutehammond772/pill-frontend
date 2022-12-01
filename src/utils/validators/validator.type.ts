// ElementValidator의 검증 결과로 사용되는 타입이다.
export const ElementValidationTypes = {
  INVALID: "INVALID",
  VALID: "VALID",

  // 해당 데이터가 특정 ElementValidator의 검증 대상이 아님을 의미한다.
  // => ElementValidator에서 모두 'PASS'를 반환하면 DomainValidator는 'INVALID'를 반환한다.
  PASS: "PASS",
} as const;

export type ElementValidationType =
  typeof ElementValidationTypes[keyof typeof ElementValidationTypes];

// DomainValidator의 검증 결과이다.
// 메시지는 'INVALID'인 경우에만 나타내도록 한다.
export interface ValidationResponse {
  valid: boolean;
  messages: Array<string>;
}

export const VALID_RESPONSE: ValidationResponse = { valid: true, messages: [] };
export const INVALID_RESPONSE = (
  messages: Array<string>
): ValidationResponse => ({ valid: false, messages });

// ElementValidator 각각의 검증 결과이다.
export interface ElementValidationResponse {
  type: ElementValidationType;
  messages: Array<string>;
}

// 같은 타입의 DomainValidator가 나 자신만 존재하는 경우 id가 'DEFAULT_ID'로 저장된다.
export const DEFAULT_ID = "DEFAULT_ID";

// 전반적인 검증 과정에서 생기는 'INVALID' 메시지이다.
export const ValidationErrorMessages = {
  ALL_PASSED: `모든 ElementValidator가 'PASS'를 반환하였습니다.
    해당 DomainValidator에 이 데이터를 검증할 ElementValidator가 필요합니다.`,

  LACK_DEPENDENCIES:
    "하위 DomainValidator의 최소 개수를 충족하지 못하였습니다.",

  DEPENDENCIES_NOT_VALIDATED:
    "하위 DomainValidator의 검증 결과가 모두 나오지 않았습니다.",

  DEPENDENCIES_NOT_ADDED:
    "하위 Validator가 존재하도록 설정했으나 아직 등록된 하위 Validator가 없습니다.",
} as const;

// 도메인 내 특정 요소(데이터)에 대한 Validator이다.
// 검증이 필요한 요소가 많아 세분화할 필요가 있을 때 여러 ElementValidator로 나눌 수 있지만,
// 굳이 세분화할 필요가 없을 때에는 하나의 ElementValidator에서 연속 검증으로 구현할 수 있다.
export type ElementValidator<T> = (t: T) => ElementValidationResponse;

// 도메인에 대한 Validator이다.
export interface DomainValidator<T> {
  // DomainValidator의 고유 이름이다.
  signature: string;

  // 도메인 내 검증이 필요한 모든 요소들은 이 validators 필터를 거친다.
  validators: Array<ElementValidator<T>>;

  // 자신과 같은 타입의 DomainValidator가 하나 이상 존재할 수 있는 경우, 구분을 위해 id를 설정한다.
  // 만약 하나만 존재하는 경우 생략할 수 있으며, 해당 DomainValidator 내에서의 id는 'DEFAULT_ID'로 설정된다.
  id?: string;

  // 다른 상위 DomainValidator에 의존하는 경우 설정한다.
  dependency?: string;

  // 하위 DomainValidator의 최소 갯수를 설정한다. 명시하지 않는 경우 없는 것으로 간주한다.
  minDependencies?: number;
}

export interface ValidatorInfo {
  validatorID: string;
  dependency?: string;
  minDependencies?: number;
}

export const validatorID = (signature: string, id?: string) =>
  `${signature}:${id || DEFAULT_ID}`;
