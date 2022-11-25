import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PillContentData, PillIndexData } from "../creator";

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

const rollbackSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    reset: () => initialState,
    captureIndex: (state, action: PayloadAction<{ data: PillIndexData }>) => {
      state.indexes.push(copyIndex(action.payload.data));
    },
    removeIndex: (state, action: PayloadAction<{ id: string }>) => {
      state.indexes = state.indexes.filter(
        (index) => index.id !== action.payload.id
      );
    },
    captureContent: (
      state,
      action: PayloadAction<{ data: PillContentData }>
    ) => {
      state.contents.push({ ...action.payload.data });
    },
    removeContent: (state, action: PayloadAction<{ contentId: string }>) => {
      state.contents = state.contents.filter(
        (content) => content.contentId !== action.payload.contentId
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
