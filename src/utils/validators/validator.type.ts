
// Validation 결과로 사용되는 타입이다.
const ValidatedType = {
  // Validation에 실패할 시
  INVALID: "Invalid",

  // Validation에 성공할 시
  VALID: "Valid",

  // 해당 데이터가 자기 관할이 아닐 때
  // (= 동일한 Validator 내에 해당 데이터를 담당하는 ValidateFunction이 존재할 때)
  // 참고로, 도메인 Validator에서 모든 Validation 결과가 'PASS'이면 'INVALID'로 간주한다.
  PASS: "Pass",
} as const;

type Validated = typeof ValidatedType[keyof typeof ValidatedType];

// Validation 결과에서 메시지가 필요한 경우, enum 형태로 정형화하여 그 중 한 원소의 형태로 내보내야 한다.
// ex. Messages.EMPTY = "this content is empty" 와 같이 enum 형태로 구현하여 사용한다.
type ValidationMessageEnum = { [s: string]: string };

// Validation 결과를 나타낸다.
// 메시지는 'INVALID'인 경우에만 나타내도록 한다.
interface ValidationResult<E extends ValidationMessageEnum> {
  result: Validated;
  message?: E[keyof E];
}

type ValidateFunction<T, E extends ValidationMessageEnum> = (
  t: T
) => ValidationResult<E>;

const DEFAULT_ID = "Default";

// Other 'INVALID' Messages
const ALL_PASSED = "all validator passed";
const NOT_REGISTERED = "some validator is not registered";
const DEPENDENCIES_NOT_CHECKED = "dependencies are not checked";

// 특정 도메인에 대한 Validator이다.
interface DomainValidator<T, E extends ValidationMessageEnum> {
  // 특정 도메인에 대한 Validator의 고유 이름이다.
  signature: string;

  // 도메인 내 Validation이 필요한 모든 요소들은 이 validators 필터를 거친다.
  // 일반적으로 각각의 validator는 특정한 요소의 데이터만을 담당하게 된다.
  validators: Array<ValidateFunction<T, E>>;

  // 자신과 같은 종류의 Validator가 더 존재하는 경우, 구분을 위해 id를 설정한다.
  // 만약 하나만 존재하는 경우 생략할 수 있으며, Validator 내에서의 id는 'DEFAULT'로 설정된다.
  id?: string;

  // 다른 도메인의 Validator에 의존하는 경우 dependencies에 추가한다.
  // 1. 하위 컴포넌트의 Validation 결과가 필요한 경우 각각의 Validator Signature를 추가하면 된다.
  // 이때, 각각의 Validation 결과 중 하나라도 'INVALID'인 경우 이 도메인 Validator 또한 'INVALID'로 간주한다.
  // 2. 하위 컴포넌트가 여러 개인 경우 useValidation Hook에서 각각의 id를 추가한다.
  // 만약 위의 과정을 생략하면 'DEFAULT' id를 가진 Validator에 의존하게 된다.
  dependencies: Array<string>;
}

export { ValidatedType, DEFAULT_ID, ALL_PASSED, NOT_REGISTERED, DEPENDENCIES_NOT_CHECKED };
export type { DomainValidator, ValidateFunction, ValidationResult, ValidationMessageEnum, Validated };
