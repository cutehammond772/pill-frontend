import { createAction, createReducer } from "@reduxjs/toolkit";

import * as Array from "../other/data-structure/optional-array";
import {
  CopyNothing,
  CopyOptionSignatures,
} from "../other/data-structure/options";
import { DisabledMenus, SelectedMenu } from "../hooks/header/header.type";

export const REDUCER_NAME = "header";

export interface HeaderState {
  preventClick: boolean;

  selected: SelectedMenu;
  disabled: DisabledMenus;
}

const initialState: HeaderState = {
  selected: {},
  disabled: {},
  preventClick: false,
};

export const ActionTypes = {
  RESET: `${REDUCER_NAME}/RESET`,

  SELECT: `${REDUCER_NAME}/SELECT`,
  RESET_HEADER_SELECTION: `${REDUCER_NAME}/RESET_HEADER_SELECTION`,

  DISABLE: `${REDUCER_NAME}/DISABLE`,
  RESET_HEADER_DISABLED: `${REDUCER_NAME}/RESET_HEADER_DISABLED`,

  LOCK_INTERACTION: `${REDUCER_NAME}/LOCK_INTERACTION`,
  UNLOCK_INTERACTION: `${REDUCER_NAME}/UNLOCK_INTERACTION`,
} as const;

export const Actions = {
  // For Reducer
  reset: createAction(ActionTypes.RESET),

  select: createAction<{ header: string; menu: string }>(ActionTypes.SELECT),
  resetHeaderSelection: createAction<{ header: string }>(
    ActionTypes.RESET_HEADER_SELECTION
  ),

  disable: createAction<{ header: string; menu: string }>(ActionTypes.DISABLE),
  resetHeaderDisabled: createAction<{ header: string }>(
    ActionTypes.RESET_HEADER_DISABLED
  ),

  lockInteraction: createAction(ActionTypes.LOCK_INTERACTION),
  unlockInteraction: createAction(ActionTypes.UNLOCK_INTERACTION),
} as const;

const option: CopyNothing = { type: CopyOptionSignatures.COPY_NOTHING };

const headerReducer = createReducer(initialState, {
  [ActionTypes.RESET]: () => initialState,

  [ActionTypes.SELECT]: (state, action: ReturnType<typeof Actions.select>) => {
    state.selected[action.payload.header] = action.payload.menu;
  },

  [ActionTypes.RESET_HEADER_SELECTION]: (
    state,
    action: ReturnType<typeof Actions.resetHeaderSelection>
  ) => {
    delete state.selected[action.payload.header];
  },

  [ActionTypes.DISABLE]: (
    state,
    action: ReturnType<typeof Actions.disable>
  ) => {
    Array.removeAll(
      (item) => item === action.payload.menu,
      state.disabled[action.payload.header],
      option
    );
  },

  [ActionTypes.RESET_HEADER_DISABLED]: (
    state,
    action: ReturnType<typeof Actions.resetHeaderDisabled>
  ) => {
    state.disabled[action.payload.header] = [];
  },

  [ActionTypes.LOCK_INTERACTION]: (state) => {
    state.preventClick = true;
  },

  [ActionTypes.UNLOCK_INTERACTION]: (state) => {
    state.preventClick = false;
  },
});

export default headerReducer;
