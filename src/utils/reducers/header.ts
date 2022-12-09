import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";

import * as array from "../other/data-structure/smart-array";
import * as map from "../other/data-structure/index-signature-map";

import { DisabledMenus, SelectedMenu } from "../hooks/header/header.type";
import { RootState } from ".";
import { identity } from "../other/identity";
import { CopyOptions } from "../other/data-structure/options";

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

// Reducer 요청
export const ReducerActionTypes = {
  RESET: `${REDUCER_NAME}/RESET`,

  SELECT: `${REDUCER_NAME}/SELECT`,
  RESET_HEADER_SELECTION: `${REDUCER_NAME}/RESET_HEADER_SELECTION`,

  DISABLE: `${REDUCER_NAME}/DISABLE`,
  RESET_HEADER_DISABLED: `${REDUCER_NAME}/RESET_HEADER_DISABLED`,

  LOCK_INTERACTION: `${REDUCER_NAME}/LOCK_INTERACTION`,
  UNLOCK_INTERACTION: `${REDUCER_NAME}/UNLOCK_INTERACTION`,
} as const;

// hook 또는 외부 로직에서의 요청
export const Actions = {
  reset: createAction(ReducerActionTypes.RESET),

  select: createAction<{ header: string; menu: string }>(
    ReducerActionTypes.SELECT
  ),
  resetHeaderSelection: createAction<{ header: string }>(
    ReducerActionTypes.RESET_HEADER_SELECTION
  ),

  disable: createAction<{ header: string; menu: string }>(
    ReducerActionTypes.DISABLE
  ),
  resetHeaderDisabled: createAction<{ header: string }>(
    ReducerActionTypes.RESET_HEADER_DISABLED
  ),
} as const;

// saga 로직 등 내부 로직에서의 요청
export const InternalActions = {
  lockInteraction: createAction(ReducerActionTypes.LOCK_INTERACTION),
  unlockInteraction: createAction(ReducerActionTypes.UNLOCK_INTERACTION),
} as const;

const headerFn = (_: RootState, header: string) => header;

const preventClickSelector = (state: RootState) => state.header.preventClick;
const selectedSelector = (state: RootState) => state.header.selected;
const disabledSelector = (state: RootState) => state.header.disabled;

export const StaticSelectors = {
  PREVENT_CLICK: createSelector([preventClickSelector], identity),
} as const;

export const DynamicSelectors = {
  SELECTED_MENU: () =>
    createSelector(
      [selectedSelector, headerFn],
      (headers, header) => headers[header]
    ),
  DISABLED_MENUS: () =>
    createSelector(
      [disabledSelector, headerFn],
      (headers, header) => headers[header]
    ),
} as const;

const headerReducer = createReducer(initialState, {
  [ReducerActionTypes.RESET]: () => initialState,

  [ReducerActionTypes.SELECT]: (
    state,
    action: ReturnType<typeof Actions.select>
  ) => {
    state.selected[action.payload.header] = action.payload.menu;
  },

  [ReducerActionTypes.RESET_HEADER_SELECTION]: (
    state,
    action: ReturnType<typeof Actions.resetHeaderSelection>
  ) => {
    delete state.selected[action.payload.header];
  },

  [ReducerActionTypes.DISABLE]: (
    state,
    action: ReturnType<typeof Actions.disable>
  ) => {
    map.replace(state.disabled, CopyOptions.COPY_NOTHING)(
      (disabled) =>
        array.remove(disabled)((item) => item === action.payload.menu),
      action.payload.header
    );
  },

  [ReducerActionTypes.RESET_HEADER_DISABLED]: (
    state,
    action: ReturnType<typeof Actions.resetHeaderDisabled>
  ) => {
    state.disabled[action.payload.header] = [];
  },

  [ReducerActionTypes.LOCK_INTERACTION]: (state) => {
    state.preventClick = true;
  },

  [ReducerActionTypes.UNLOCK_INTERACTION]: (state) => {
    state.preventClick = false;
  },
});

export default headerReducer;
