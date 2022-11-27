import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PillContentData, PillIndexData } from "./creator";
import * as Array from "../other/data-structure/optional-array";
import {
  CopyNothing,
  CopyOptionSignatures,
} from "../other/data-structure/options";

const REDUCER_NAME = "rollback";

interface RollbackState {
  indexes: Array<PillIndexData>;
  contents: Array<PillContentData>;
}

const initialState: RollbackState = {
  indexes: [],
  contents: [],
};

const copyIndex = (data: PillIndexData) => ({
  ...data,
  contents: data.contents.map((content) => ({ ...content })),
});

const option: CopyNothing = { type: CopyOptionSignatures.COPY_NOTHING };

const rollbackSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    reset: () => initialState,

    captureIndex: (state, action: PayloadAction<{ data: PillIndexData }>) => {
      Array.push(copyIndex(action.payload.data), state.indexes, option);
    },

    removeIndex: (state, action: PayloadAction<{ id: string }>) => {
      Array.removeAll(
        (index) => index.id !== action.payload.id,
        state.indexes,
        option
      );
    },

    captureContent: (
      state,
      action: PayloadAction<{ data: PillContentData }>
    ) => {
      Array.push({ ...action.payload.data }, state.contents, option);
    },

    removeContent: (state, action: PayloadAction<{ contentId: string }>) => {
      Array.removeAll(
        (content) => content.contentId !== action.payload.contentId,
        state.contents,
        option
      );
    },
  },
});

export const {
  reset,
  captureIndex,
  removeIndex,
  captureContent,
  removeContent,
} = rollbackSlice.actions;
export { REDUCER_NAME, type RollbackState };
export default rollbackSlice.reducer;
