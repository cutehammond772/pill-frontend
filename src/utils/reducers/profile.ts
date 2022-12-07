import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";
import { identity } from "../other/identity";

export const REDUCER_NAME = "profile";

export interface ProfileState {
  userName?: string;
  profileUrl?: string;
}

const initialState: ProfileState = {};

// Reducer 요청
export const ReducerActionTypes = {
  SET_TO_USER: `${REDUCER_NAME}/SET_TO_USER`,
  SET_TO_ANONYMOUS: `${REDUCER_NAME}/SET_TO_ANONYMOUS`,
} as const;

// saga 로직 등 내부 로직에서의 요청
export const InternalActions = {
  setToUser: createAction<{
    userName: string;
    profileUrl: string;
  }>(ReducerActionTypes.SET_TO_USER),

  setToAnonymous: createAction(ReducerActionTypes.SET_TO_ANONYMOUS),
} as const;

const profileSelector = (state: RootState) => state.profile;

export const StaticSelectors = {
  PROFILE: createSelector([profileSelector], identity),
} as const;

const profileReducer = createReducer(initialState, {
  [ReducerActionTypes.SET_TO_ANONYMOUS]: () => initialState,
  [ReducerActionTypes.SET_TO_USER]: (
    _,
    action: ReturnType<typeof InternalActions.setToUser>
  ) => action.payload,
});

export default profileReducer;
