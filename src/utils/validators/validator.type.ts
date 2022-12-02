// ElementValidator의 검증 결과로 사용되는 타입이다.
export const ElementValidationTypes = {
  INVALID: "INVALID",
  VALID: "VALID",

  // 아직 검증되지 않은 요소이거나,
  // 다른 ElementValidator가 담당해야 할 요소가 검증을 시도했을 때 반환됩니다.
  EMPTY: "EMPTY",
} as const;

export type ElementValidationType =
  typeof ElementValidationTypes[keyof typeof ElementValidationTypes];

export type ElementValidationResponses = {
  [validatorName: string]: ElementValidationResponse;
};

// Validator의 검증 결과이다.
export interface ValidationResponse {
  valid: boolean;
  elements: ElementValidationResponses;
}

// Redux store에 저장되는 검증 데이터이다.
export interface Validation {
  valid: boolean;
  messages: Array<string>;
}

// ElementValidator 각각의 검증 결과이다.
export interface ElementValidationResponse {
  type: ElementValidationType;
  messages: Array<string>;
}

// 같은 타입의 DomainValidator가 나 자신만 존재하는 경우 id가 'DEFAULT_ID'로 저장된다.
export const DEFAULT_ID = "DEFAULT_ID";

// 특정 요소(데이터)에 대한 Validator이다.
// 검증이 필요한 요소가 많아 세분화할 필요가 있을 때 여러 ElementValidator로 나눌 수 있지만,
// 굳이 세분화할 필요가 없을 때에는 하나의 ElementValidator에서 연속 검증으로구현할 수 있다.
export type ElementValidator<T> = (t: T) => ElementValidationResponse;

export interface Validator<T> {
  // Validator의 고유 ID이다. validatorID 함수를 이용해 생성한다.
  validatorID: string;

  // Validator의 고유 이름이다.
  signature: string;

  // 검증이 필요한 모든 '요소'들의 Validator이다.
  validators: { [signature: string]: ElementValidator<T> };

  // 다른 상위 Validator에 의존하는 경우 설정한다.
  top?: string;

  // 등록될 수 있는 하위 Validator의 패턴을 나타낸다.
  // 명시하지 않는 경우 없는 것으로 간주한다.
  subPattern?: SubValidatorPattern;
}

export interface ValidatorInfo {
  validatorID: string;
  top?: string;
  subPattern?: SubValidatorPattern;
}

// 하위 Validator가 존재할 수 있는 패턴을 나타낸다.
export interface SubValidatorPattern {
  patterns: { [signature: string]: ValidatorQuantifier };

  // 특정 하위 Validator들끼리 그룹을 지어야 할 때 사용한다.
  //
  // ex. 한 접시에 '고기나 생선이 하나 이상' 있어야 한다고 할 때,
  // 기존 패턴으로는 구현할 수 없다. 이때 그룹을 이용한다고 하면,
  //
  // ['음식'] = ['고기', '생선'] 으로 그룹을 짠 뒤
  // patterns에 ['음식'] = EXIST 로 나타내면 된다.
  // - 이때 그룹 내 요소들은 모두 OR 처리된다. AND의 경우 그냥 각각 패턴으로 표현하면 되기 때문이다.
  // - 그룹 패턴의 경우 EXIST 또는 OPTIONAL만 가능하다.
  groups?: { [group: string]: Array<string> };
}

// 특정 하위 Validator의 개수 제한을 나타낸다.
export const ValidatorQuantifiers = {
  OPTIONAL: "?", // 0 또는 1개만 존재해야 한다.
  ALL: "*", // 0부터 무제한까지 모두 가능하다.
  EXIST: "+", // 1부터 무제한까지 가능하다.
  ONE: "!", // 딱 하나만 존재해야 한다.
} as const;

export type ValidatorQuantifier =
  typeof ValidatorQuantifiers[keyof typeof ValidatorQuantifiers];

// Validator의 고유 ID를 생성한다.
// 1. Signature: Validator의 고유 이름이다.
// 2. Id: 같은 Signature를 가진 다른 Validator들과 구분하기 위해 사용한다.
// => 설정하지 않은 경우 'DEFAULT_ID'로 설정된다.
export const validatorID = (signature: string, id?: string) =>
  `${signature}:${id || DEFAULT_ID}`;

export const initialValidatorResponse = (
  validator: Validator<any>
): ValidationResponse => {
  return {
    valid: false,
    elements: Object.keys(validator.validators).reduce((acc, signature) => {
      acc[signature] = {
        type: ElementValidationTypes.EMPTY,
        messages: [],
      };

      return acc;
    }, {} as ElementValidationResponses),
  };
};

// 하위 Validator가 현재 패턴에 잘 부합하는지 확인한다.
export const resolvePattern = (
  pattern: SubValidatorPattern,
  subs: Array<String>
) => {
  for (const key of Object.keys(pattern.patterns)) {
    const quantifier = pattern.patterns[key];
    let count = -1;
    let group = false;

    // 그룹 패턴의 경우
    if (!!pattern.groups && !!pattern.groups[key]) {
      group = true;

      const signatures = pattern.groups[key];
      count = signatures.reduce((acc, signature) => {
        return acc + subs.filter((sub) => sub.startsWith(signature)).length;
      }, 0);
    }
    // 일반 패턴의 경우
    else {
      count = subs.filter((sub) => sub.startsWith(key)).length;
    }

    if (count === -1) {
      throw new Error(
        "[resolvePattern] 하위 Validator의 패턴을 분석하는 중 오류가 발생하였습니다."
      );
    }

    switch (quantifier) {
      case ValidatorQuantifiers.EXIST:
        if (count < 1) {
          return false;
        }
        break;
      case ValidatorQuantifiers.ONE:
        if (count !== 1) {
          return false;
        }
        break;
      case ValidatorQuantifiers.OPTIONAL:
        if (count > 1) {
          return false;
        }
        break;
      case ValidatorQuantifiers.ALL:
        break;
      default:
        throw new Error(
          group
            ? "[resolvePattern] 하위 Validator 그룹 패턴이 유효하지 않습니다."
            : `"[resolvePattern] 하위 Validator 패턴이 유효하지 않습니다."`
        );
    }
  }
  return true;
};
