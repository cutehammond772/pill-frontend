import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as Array from "../other/data-structure/optional-array";
import {
  CopyNothing,
  CopyOptionSignatures,
} from "../other/data-structure/options";

interface RunOnceState {
  runIds: Array<string>;
}

const REDUCER_NAME = "run_once";
const initialState: RunOnceState = {
  runIds: [],
};

const option: CopyNothing = { type: CopyOptionSignatures.COPY_NOTHING };

const runOnceSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ runId: string }>) => {
      Array.push(action.payload.runId, state.runIds, option);
    },

    remove: (state, action: PayloadAction<{ runId: string }>) => {
      Array.removeAll(
        (runId) => runId !== action.payload.runId,
        state.runIds,
        option
      );
    },

    reset: (state, action: PayloadAction<{ regexp?: string }>) => {
      if (!!action.payload.regexp) {
        Array.removeAll(
          (runId) => !RegExp(action.payload.regexp || "").test(runId),
          state.runIds,
          option
        );
      } else {
        state.runIds = [];
      }
    },
  },
});

export const { add, remove, reset } = runOnceSlice.actions;
export { REDUCER_NAME, type RunOnceState };
export default runOnceSlice.reducer;
