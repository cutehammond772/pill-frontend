import { Reducer } from "redux";
import { INITIAL_STATE, OnceAttempts, OnceReducingType } from "./once.type";

const addAttempt = (key: string) => ({
  type: OnceReducingType.ADD,
  key: key,
});

const resetAttempt = (key: string) => ({
  type: OnceReducingType.RESET,
  key: key,
});

type OnceReducingAction =
  | ReturnType<typeof addAttempt>
  | ReturnType<typeof resetAttempt>;

const onceReducer: Reducer<OnceAttempts, OnceReducingAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case OnceReducingType.ADD:
      return {
        ...state,
        attempts: state.attempts.concat(action.key),
      };
    case OnceReducingType.RESET:
      return {
        ...state,
        attempts: state.attempts.filter((key) => key !== action.key),
      };
    default:
      return state;
  }
};

export { addAttempt, resetAttempt, onceReducer };
