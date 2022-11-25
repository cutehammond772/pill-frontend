import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HeaderContainer } from "../../hooks/header/header.type";

interface HeaderState {
  title?: string;
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

const headerSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    init: () => initialState,
    changeTitle: (state, action: PayloadAction<{ title: string }>) => {
      state.title = action.payload.title;
    },
    selectItem: (state, action: PayloadAction<{ header: string, item: string }>) => {
      state.selected[action.payload.header] = [
        ...state.selected[action.payload.header],
        action.payload.item,
      ];
    },
    disableItem: (state, action: PayloadAction<{ header: string, item: string }>) => {
      state.disabled[action.payload.header] = [
        ...state.disabled[action.payload.header],
        action.payload.item,
      ];
    },
    resetHeaderSelection: (state, action: PayloadAction<{ header: string }>) => {
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
  changeTitle,
  selectItem,
  disableItem,
  resetHeaderSelection,
  resetHeaderDisabled,
  lockInteraction,
  unlockInteraction,
} = headerSlice.actions;
export { REDUCER_NAME, type HeaderState };
export default headerSlice.reducer;
