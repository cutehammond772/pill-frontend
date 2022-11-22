// 검증 결과로 사용되는 타입이다.
const ValidatedType = {
  // 검증에 실패할 시
  INVALID: "INVALID",

  // 검증에 성공할 시
  VALID: "VALID",

  // 해당 데이터가 자기 관할이 아닐 때
  // (= 같은 DomainValidator 내에 해당 데이터를 담당하는 ElementValidator이 존재할 때)
  // 참고로, DomainValidator에서 모든 검증 결과가 'PASS'이면 'INVALID'로 간주한다.
  PASS: "PASS",
} as const;

// ValidatedType의 type 형태이다.
type Validated = typeof ValidatedType[keyof typeof ValidatedType];

// 검증 결과에서 메시지가 필요한 경우, enum 형태로 정형화하여 그 중 한 원소의 형태로 내보내야 한다.
// ex. Messages.EMPTY = "this content is empty" 와 같이 enum 형태로 구현하여 사용한다.
type ValidationMessages = { [s: string]: string };

// 검증 결과를 나타낸다. 메시지에 타입 검사가 포함되어 있다.
// 메시지는 'INVALID'인 경우에만 나타내도록 한다.
interface ValidationResponse<E extends ValidationMessages> {
  result: Validated;
  messages: Array<E[keyof E]>;
}

// 검증 결과를 redux container에 저장할 때 사용한다.
// 메시지의 타입 검사가 제거되고 모두 문자열로 반환된다.
// => 이는 redux container에 저장하기 위한 목적도 있지만, 의존 Validator의 메시지도 같이 포함하기 위한 목적도 있다.
interface UntypedValidationResponse {
  result: Validated;
  messages: Array<string>;
}

// redux container에 저장된 검증 결과이다.
// UntypedValidationResponse와 달리 version이 존재한다.
interface Validation {
  result: Validated;
  messages: Array<string>;

  // 해당 검증 결과가 몇 번째 결과인지 확인한다.
  // 일반적으로 의존 Validator의 검증 결과를 확인할 때 현재 캐시된 검증 결과 대비 최신인지 확인하기 위해 활용된다.
  version: number;
}

// 자신과 같은 타입의 DomainValidator가 나 자신만 존재하는 경우 'DEFAULT_ID' id로 저장된다.
const DEFAULT_ID = "DEFAULT_ID";

// 일반적인 요소 검증에서 나오는 'INVALID' 메시지가 아닌 전반적인 검증 과정에서 생기는 오류 메시지이다.
const ValidationErrorMessages = {
  ALL_PASSED: "모든 ElementValidator가 'PASS'를 반환하였습니다.",

  DEPENDENCIES_LACK:
    "의존하는 DomainValidator의 최소 개수를 충족하지 못하였습니다.",

  NOT_VALIDATED: "아직 DomainValidator의 검증 결과가 나오지 않았습니다.",

  DEPENDENCIES_NOT_VALIDATED:
    "아직 의존하고 있는 하위 DomainValidator의 검증 결과가 나오지 않았습니다.",
} as const;

// 도메인 내 특정 요소에 대한 Validator이다.
// 검증이 필요한 요소가 많아 세분화할 필요가 있을 때 여러 ElementValidator로 나눌 수 있지만,
// 굳이 세분화할 필요가 없을 때에는 하나의 ElementValidator에서 연속 검증으로 구현할 수 있다.
type ElementValidator<T, E extends ValidationMessages> = (
  t: T
) => ValidationResponse<E>;

// 도메인에 대한 Validator이다.
interface DomainValidator<T, E extends ValidationMessages> {
  // DomainValidator의 고유 이름이다.
  signature: string;

  // 도메인 내 검증이 필요한 모든 요소들은 이 validators 필터를 거친다.
  validators: Array<ElementValidator<T, E>>;

  // 자신과 같은 타입의 DomainValidator가 하나 이상 존재하는 경우(존재할 가능성이 있는 경우), 구분을 위해 id를 설정한다.
  // 만약 하나만 존재하는 경우 생략할 수 있으며, 해당 DomainValidator 내에서의 id는 'DEFAULT_ID'로 설정된다.
  id?: string;

  // 다른 상위 DomainValidator에 의존하는 경우 설정한다.
  dependency?: string;

  // 자신을 의존하는 하위 DomainValidator의 최소 갯수를 설정한다. 기본값은 0이다.
  minDependencies?: number;
}

const validatorID = (signature: string, id?: string) =>
  `${signature}:${id || DEFAULT_ID}`;

export { ValidatedType, ValidationErrorMessages, validatorID };
export type {
  DomainValidator,
  ElementValidator,
  ValidationResponse,
  UntypedValidationResponse,
  Validation,
  ValidationMessages,
  Validated,
};
