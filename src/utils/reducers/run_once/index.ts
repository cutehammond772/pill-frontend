import { Reducer } from "redux";
import {
  INITIAL_STATE,
  RunOnceContainer,
  RunOnceReducingType,
} from "./run_once.type";

const addRunOnce = (runId: string) => ({
  type: RunOnceReducingType.ADD,
  runId,
});

const removeRunOnce = (runId: string) => ({
  type: RunOnceReducingType.REMOVE,
  runId,
});

const resetRunOnce = (regexp?: string) => ({
  type: RunOnceReducingType.RESET,
  regexp,
});

type RunOnceReducingAction =
  | ReturnType<typeof addRunOnce>
  | ReturnType<typeof removeRunOnce>
  | ReturnType<typeof resetRunOnce>;

const runOnceReducer: Reducer<RunOnceContainer, RunOnceReducingAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case RunOnceReducingType.ADD:
      return {
        ...state,
        runIds: state.runIds.concat(action.runId),
      };
    case RunOnceReducingType.REMOVE:
      return {
        ...state,
        runIds: state.runIds.filter((runId) => runId !== action.runId),
      };
    case RunOnceReducingType.RESET:
      if (action.regexp === undefined) {
        return INITIAL_STATE;
      }

      return {
        ...state,
        runIds: state.runIds.filter((runId) => !RegExp(action.regexp || "").test(runId)),
      };
    default:
      return state;
  }
};

export { runOnceReducer, addRunOnce, removeRunOnce, resetRunOnce };
