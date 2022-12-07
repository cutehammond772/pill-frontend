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

// Reducer 요청
export const ReducerActionTypes = {
  LOCK_NAVIGATE: `${REDUCER_NAME}/LOCK_NAVIGATE`,
  UNLOCK_NAVIGATE: `${REDUCER_NAME}/UNLOCK_NAVIGATE`,
} as const;

// hook 또는 외부 로직에서의 요청
export const Actions = {
  lockNavigate: createAction(ReducerActionTypes.LOCK_NAVIGATE),
  unlockNavigate: createAction(ReducerActionTypes.UNLOCK_NAVIGATE),
};

const lockedSelector = (state: RootState) => state.pageNavigate.locked;

export const StaticSelectors = {
  LOCKED: createSelector([lockedSelector], identity),
} as const;

const pageNavigateReducer = createReducer(initialState, {
    [ReducerActionTypes.LOCK_NAVIGATE]: (state) => {
        state.locked = true;
    },

    [ReducerActionTypes.UNLOCK_NAVIGATE]: (state) => {
        state.locked = false;
    },
});

export default pageNavigateReducer;