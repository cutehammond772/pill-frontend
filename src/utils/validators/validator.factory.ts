import { ValidatedType } from "./validator.type";

// Validator를 만드는 과정에서 공유하는 데이터이다.
interface ValidationChain<E> {
  // 이미 이전 검증 과정에서 'PASS'가 나온 여부를 확인한다.
  alreadyPassed?: boolean;

  skipAfterFirstInvalid?: boolean;

  // 검증 과정에서 생기는 메시지이다.
  // 이때 메시지는 'INVALID' 메시지만 들어갈 수 있다.
  messages: Array<E[keyof E]>;
}

// Validator를 만드는 과정의 초입에 해당한다.
// { skipAfterFirstInvalid: true } 이면 처음 'INVALID'가 나온 이후의 과정은 모두 생략된다. ('PASS' 제외)
const begin = <T, E>(t: T, skipAfterFirstInvalid?: boolean) => {
  const chain: ValidationChain<E> = {
    messages: [],
    skipAfterFirstInvalid: skipAfterFirstInvalid,
  };

  return next(t, chain);
};

const next = <T, E>(t: T, chain: ValidationChain<E>) => ({
  // 특정 조건에 부합하면 'PASS' 한다. 이 경우 나머지 검증 과정은 생략된다.
  // 되도록이면 로직의 맨 처음에 pass가 위치하도록 한다.
  pass: (predicate: (t: T) => boolean) => passFn(t, predicate(t), chain),

  // 검증을 진행한다.
  validate: (predicate: (t: T) => boolean, e: E[keyof E]) =>
    validateFn(t, predicate(t), e, chain),

  // 검증 과정을 끝낸다. 이때 'INVALID'가 없고 'VALID'가 하나라도 존재하면 'VALID'로 저장된다.
  done: () => doneFn(chain),
});

const passFn = <T, E>(t: T, pass: boolean, chain: ValidationChain<E>) => {
  if (!chain.alreadyPassed && pass) {
    chain.alreadyPassed = true;
  }

  return next(t, chain);
};

const validateFn = <T, E>(
  t: T,
  validate: boolean,
  e: E[keyof E],
  chain: ValidationChain<E>
) => {
  if (!chain.alreadyPassed) {
    if (
      (!!chain.skipAfterFirstInvalid && chain.messages.length === 0) ||
      !chain.skipAfterFirstInvalid
    ) {
      if (!validate) {
        chain.messages = chain.messages.concat(e);
      }
    }
  }

  return next(t, chain);
};

const doneFn = <E>(chain: ValidationChain<E>) => {
  return {
    result: !!chain.alreadyPassed
      ? ValidatedType.PASS
      : chain.messages.length > 0
      ? ValidatedType.INVALID
      : ValidatedType.VALID,

    // 'PASS'나 'VALID'의 경우 message를 보내지 않는다.
    messages: [...chain.messages],
  };
};

export { begin };
