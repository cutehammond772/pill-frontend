// Validation 결과로 사용되는 타입이다.
const ValidatedType = {
  // Validation에 실패할 시
  INVALID: "INVALID",

  // Validation에 성공할 시
  VALID: "VALID",

  // 해당 데이터가 자기 관할이 아닐 때
  // (= 동일한 Validator 내에 해당 데이터를 담당하는 ValidateFunction이 존재할 때)
  // 참고로, 도메인 Validator에서 모든 Validation 결과가 'PASS'이면 'INVALID'로 간주한다.
  PASS: "PASS",
} as const;

// ValidatedType의 type 형태이다.
type Validated = typeof ValidatedType[keyof typeof ValidatedType];

// Validation 결과에서 메시지가 필요한 경우, enum 형태로 정형화하여 그 중 한 원소의 형태로 내보내야 한다.
// ex. Messages.EMPTY = "this content is empty" 와 같이 enum 형태로 구현하여 사용한다.
type ValidationMessages = { [s: string]: string };

// Validation 결과를 나타낸다.
// 메시지는 'INVALID'인 경우에만 나타내도록 한다.
interface ValidationResult<E extends ValidationMessages> {
  result: Validated;
  messages: Array<E[keyof E]>;
}

// 자신과 같은 타입의 DomainValidator가 나 자신만 존재하는 경우 'DEFAULT_ID' id로 저장된다.
const DEFAULT_ID = "DEFAULT_ID";

// 일반적인 요소 검증에서 나오는 'INVALID' 메시지가 아닌 전반적인 검증 과정에서 생기는 오류 메시지이다.
const ValidationErrorMessages = {
  ALL_PASSED: "모든 ElementValidator가 'PASS'를 반환하였습니다.",
  DEPENDENCY_NOT_REGISTERED: "의존하는 DomainValidator 중 아직 등록되지 않은 Validator가 있습니다.",
  DEPENDENCIES_NOT_CHECKED: "의존하는 DomainValidator의 검증 결과를 아직 확인하지 못한 상태입니다.",
} as const;

// 도메인 내 특정 요소에 대한 Validator이다.
// 검증이 필요한 요소가 많아 세분화할 필요가 있을 때 여러 ElementValidator로 나눌 수 있지만,
// 굳이 세분화할 필요가 없을 때에는 하나의 ElementValidator에서 연속 검증으로 구현할 수 있다.
type ElementValidator<T, E extends ValidationMessages> = (
  t: T
) => ValidationResult<E>;

type DomainIdValidator<T, E extends ValidationMessages> = (props: { id: string }) => DomainValidator<T, E>;

// 도메인에 대한 Validator이다.
interface DomainValidator<T, E extends ValidationMessages> {
  // DomainValidator의 고유 이름이다.
  signature: string;

  // 도메인 내 검증이 필요한 모든 요소들은 이 validators 필터를 거친다.
  validators: Array<ElementValidator<T, E>>;

  // 자신과 같은 타입의 DomainValidator가 하나 이상 존재하는 경우, 구분을 위해 id를 설정한다.
  // 만약 하나만 존재하는 경우 생략할 수 있으며, 해당 DomainValidator 내에서의 id는 'DEFAULT_ID'로 설정된다.
  id?: string;

  // 다른 DomainValidator에 의존하는 경우 dependencies에 추가한다.
  //
  // 1. 다른 도메인의 검증 결과가 필요한 경우 각각의 Validator Signature를 추가하면 된다.
  // 이때, 각각의 검증 결과 중 하나라도 'INVALID'인 경우 이 DomainValidator 또한 'INVALID'로 간주한다.
  //
  // 2. 같은 DomainValidator가 여러 개인 경우 useValidation Hook에서 각각의 id를 추가한다.
  // 만약 위의 과정을 생략하면 'DEFAULT_ID' id를 가진 DomainValidator에 의존하게 된다.
  //
  dependencies: Array<string>;
}

export {
  ValidatedType,
  DEFAULT_ID,
  ValidationErrorMessages,
};
export type {
  DomainValidator,
  DomainIdValidator,
  ElementValidator,
  ValidationResult,
  ValidationMessages,
  Validated,
};
