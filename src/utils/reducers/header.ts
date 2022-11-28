import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import * as Array from "../other/data-structure/optional-array";
import {
  CopyNothing,
  CopyOptionSignatures,
} from "../other/data-structure/options";
import { DisabledMenus, SelectedMenu } from "../hooks/header/header.type";

interface HeaderState {
  preventClick: boolean;

  selected: SelectedMenu;
  disabled: DisabledMenus;
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

    select: (
      state,
      action: PayloadAction<{ header: string; menu: string }>
    ) => {
      state.selected[action.payload.header] = action.payload.menu;
    },

    disable: (
      state,
      action: PayloadAction<{ header: string; menu: string }>
    ) => {
      Array.removeAll(
        (item) => item === action.payload.menu,
        state.disabled[action.payload.header],
        option
      );
    },

    resetHeaderSelection: (
      state,
      action: PayloadAction<{ header: string }>
    ) => {
      delete state.selected[action.payload.header];
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
  select,
  disable,
  resetHeaderSelection,
  resetHeaderDisabled,
  lockInteraction,
  unlockInteraction,
} = headerSlice.actions;
export { REDUCER_NAME, type HeaderState };
export default headerSlice.reducer;