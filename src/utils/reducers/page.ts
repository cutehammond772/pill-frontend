import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  pageHeight: number;
  headerHeight: number;
  footerHeight: number;
}

const REDUCER_NAME = "page";
const initialState: PageState = {
  pageHeight: 0,
  headerHeight: 0,
  footerHeight: 0,
};

const pageSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    updatePageHeight: (state, action: PayloadAction<{ pageHeight: number }>) => {
      state.pageHeight = action.payload.pageHeight;
    },

    updateHeaderHeight: (state, action: PayloadAction<{ headerHeight: number }>) => {
      state.headerHeight = action.payload.headerHeight;
    },

    updateFooterHeight: (state, action: PayloadAction<{ footerHeight: number }>) => {
      state.footerHeight = action.payload.footerHeight;
    },
  },
});

export const { updatePageHeight, updateHeaderHeight, updateFooterHeight } =
  pageSlice.actions;
export { REDUCER_NAME, type PageState };
export default pageSlice.reducer;
