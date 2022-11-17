import {
  ValidatedType,
} from "./validator.type";

interface ValidationChain<E> {
  alreadyPassed?: boolean;
  alreadyInvalid?: boolean;
  message?: E[keyof E];
}

const begin = <T, E>(t: T) => {
  const chain: ValidationChain<E> = {};
  return chainFunctions(t, chain);
};

const chainFunctions = <T, E>(t: T, chain: ValidationChain<E>) => ({
  pass: (predicate: (t: T) => boolean) => func_pass(t, predicate(t), chain),

  validate: (predicate: (t: T) => boolean, e: E[keyof E]) =>
    func_validate(t, predicate(t), e, chain),

  done: () => func_done(chain),
});

const func_pass = <T, E>(t: T, pass: boolean, chain: ValidationChain<E>) => {
  if (!chain.alreadyPassed && pass) {
    chain.alreadyPassed = true;
  }

  return chainFunctions(t, chain);
};

const func_validate = <T, E>(
  t: T,
  validate: boolean,
  e: E[keyof E],
  chain: ValidationChain<E>
) => {
  if (!chain.alreadyInvalid && !chain.alreadyPassed && !validate) {
    chain.alreadyInvalid = true;
    chain.message = e;
  }

  return chainFunctions(t, chain);
};

const func_done = <E>(chain: ValidationChain<E>) => {
  return {
    result: !!chain.alreadyPassed
      ? ValidatedType.PASS
      : !!chain.alreadyInvalid
      ? ValidatedType.INVALID
      : ValidatedType.VALID,

    // 'PASS'의 경우 message를 보내지 않는다.
    message: !chain.alreadyPassed ? chain.message : undefined,
  };
};

export { begin };
