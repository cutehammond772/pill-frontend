const OnceReducingType = {
  ADD: "reducer.once.add",
  RESET: "reducer.once.reset",
} as const;

const INITIAL_STATE: OnceAttempts = {
  attempts: [],
};

interface OnceAttempts {
  attempts: Array<string>;
}

export type { OnceAttempts };
export { INITIAL_STATE, OnceReducingType };
