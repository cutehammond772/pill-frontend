const OnceReducingType = {
  ADD: "reducer.once.ADD",
  RESET: "reducer.once.RESET",
} as const;

const INITIAL_STATE: OnceAttempts = {
  attempts: [],
};

interface OnceAttempts {
  attempts: Array<string>;
}

export type { OnceAttempts };
export { INITIAL_STATE, OnceReducingType };
