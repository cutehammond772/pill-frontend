import { createAction, createReducer } from "@reduxjs/toolkit";

export const REDUCER_NAME = "profile";

export interface ProfileState {
  userName?: string;
  profileUrl?: string;
}

const initialState: ProfileState = {};

export const ActionTypes = {
  SET_TO_USER: `${REDUCER_NAME}/SET_TO_USER`,
  SET_TO_ANONYMOUS: `${REDUCER_NAME}/SET_TO_ANONYMOUS`,
} as const;

export const Actions = {
  // For Reducer
  setToUser: createAction<{
    userName: string;
    profileUrl: string;
  }>(ActionTypes.SET_TO_USER),

  setToAnonymous: createAction(ActionTypes.SET_TO_ANONYMOUS),
} as const;

const profileReducer = createReducer(initialState, {
  [ActionTypes.SET_TO_ANONYMOUS]: () => initialState,
  [ActionTypes.SET_TO_USER]: (
    _,
    action: ReturnType<typeof Actions.setToUser>
  ) => action.payload,
});

export default profileReducer;
