import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RunOnceState {
    runIds: Array<string>;
}

const REDUCER_NAME = "run_once";
const initialState: RunOnceState = {
    runIds: [],
}

const runOnceSlice = createSlice({
    name: REDUCER_NAME,
    initialState,
    reducers: {
        add: (state, action: PayloadAction<{ runId: string }>) => {
            state.runIds.push(action.payload.runId);
        },
        remove: (state, action: PayloadAction<{ runId: string }>) => {
            state.runIds = state.runIds.filter(runId => runId !== action.payload.runId);
        },
        reset: (state, action: PayloadAction<{ regexp?: string }>) => {
            if (!!action.payload.regexp) {
                state.runIds.filter((runId) => !RegExp(action.payload.regexp || "").test(runId));
            } else {
                state.runIds = [];
            }
        },
    }
});

export const { add, remove, reset } = runOnceSlice.actions;
export { REDUCER_NAME, type RunOnceState };
export default runOnceSlice.reducer;