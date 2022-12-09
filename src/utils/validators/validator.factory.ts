import {
  ElementValidation,
  ElementValidationTypes as type,
} from "./validator.type";

// Validator를 만드는 과정에서 공유하는 데이터이다.
interface ValidationSequence<T> {
  firstInvalidOnly?: boolean;
  functions: Array<ValidateFunction<T>>;
}

type ValidateFunction<T> = (element: T) => {
  valid: boolean;
  pass?: boolean;
  message?: string;
};

// Validator를 만드는 과정의 초입에 해당한다.
// { firstInvalidOnly: true } 이면 처음 'INVALID'가 나온 이후의 과정은 모두 생략된다. ('PASS' 제외)
export const begin = <T extends {}>(firstInvalidOnly?: boolean) =>
  next<T>({
    firstInvalidOnly,
    functions: [],
  });

const next = <T extends {}>(sequence: ValidationSequence<T>) => ({
  // 검증을 진행한다.
  validate: (predicate: (t: T) => boolean, message: string) =>
    next<T>({
      ...sequence,
      functions: sequence.functions.concat((t: T) => ({
        valid: predicate(t),
        message: message,
      })),
    }),

  filter: (arr: Array<string>) =>
    next<T>({
      ...sequence,
      functions: sequence.functions.concat((t: T) => {
        const pass = !arr.every((key) => key in t);
        return {
          valid: !pass,
          pass,
        };
      }),
    }),

  // 검증 과정을 끝낸다. 이때 'INVALID'가 없고 'VALID'가 하나라도 존재하면 'VALID'로 저장된다.
  done: () => (element: T) => validator(element, sequence),
});

const validator = <T extends {}>(
  element: T,
  sequence: ValidationSequence<T>
): ElementValidation => {
  let isPassed = false;

  const response = sequence.functions.reduce(
    (response, fn) => {
      if (
        (!!sequence.firstInvalidOnly && response.type === type.INVALID) ||
        isPassed
      ) {
        return response;
      }

      const { valid, message, pass } = fn(element);

      if (!valid) {
        if (!!pass) {
          isPassed = true;
          return response;
        }

        !!message && response.messages.push(message);
        response.type = type.INVALID;
      }

      return response;
    },
    {
      type: type.VALID,
      messages: [],
    } as ElementValidation
  );

  return isPassed ? { type: type.EMPTY, messages: [] } : response;
};
