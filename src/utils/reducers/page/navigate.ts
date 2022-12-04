import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { identity } from "../../other/identity";

export const REDUCER_NAME = "page/navigate";

export interface PageNavigateState {
  locked: boolean;
}

const initialState: PageNavigateState = {
  locked: false,
};

export const ActionTypes = {
  LOCK_NAVIGATE: `${REDUCER_NAME}/LOCK_NAVIGATE`,
  UNLOCK_NAVIGATE: `${REDUCER_NAME}/UNLOCK_NAVIGATE`,
} as const;

export const Actions = {
  lockNavigate: createAction(ActionTypes.LOCK_NAVIGATE),
  unlockNavigate: createAction(ActionTypes.UNLOCK_NAVIGATE),
};

const selector = (state: RootState) => state.pageNavigate.locked;
export const PAGE_NAVIGATION_LOCKED = createSelector([selector], identity);

const pageNavigateReducer = createReducer(initialState, {
    [ActionTypes.LOCK_NAVIGATE]: (state) => {
        state.locked = true;
    },

    [ActionTypes.UNLOCK_NAVIGATE]: (state) => {
        state.locked = false;
    },
});

export default pageNavigateReducer;