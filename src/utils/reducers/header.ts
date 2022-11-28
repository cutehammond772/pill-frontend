import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HeaderContainer } from "../hooks/header/header.type";

import * as Array from "../other/data-structure/optional-array";
import {
  CopyNothing,
  CopyOptionSignatures,
} from "../other/data-structure/options";

interface HeaderState {
  preventClick: boolean;

  selected: HeaderContainer;
  disabled: HeaderContainer;
}

const REDUCER_NAME = "header";
const initialState: HeaderState = {
  selected: {},
  disabled: {},
  preventClick: false,
};

const option: CopyNothing = { type: CopyOptionSignatures.COPY_NOTHING };

const headerSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    init: () => initialState,

    selectItem: (
      state,
      action: PayloadAction<{ header: string; item: string }>
    ) => {
      Array.push(
        action.payload.item,
        state.selected[action.payload.header],
        option
      );
    },

    disableItem: (
      state,
      action: PayloadAction<{ header: string; item: string }>
    ) => {
      Array.removeAll(
        (item) => item === action.payload.item,
        state.disabled[action.payload.header],
        option
      );
    },

    resetHeaderSelection: (
      state,
      action: PayloadAction<{ header: string }>
    ) => {
      state.selected[action.payload.header] = [];
    },

    resetHeaderDisabled: (state, action: PayloadAction<{ header: string }>) => {
      state.disabled[action.payload.header] = [];
    },

    lockInteraction: (state) => {
      state.preventClick = true;
    },

    unlockInteraction: (state) => {
      state.preventClick = false;
    },
  },
});

export const {
  init,
  selectItem,
  disableItem,
  resetHeaderSelection,
  resetHeaderDisabled,
  lockInteraction,
  unlockInteraction,
} = headerSlice.actions;
export { REDUCER_NAME, type HeaderState };
export default headerSlice.reducer;
