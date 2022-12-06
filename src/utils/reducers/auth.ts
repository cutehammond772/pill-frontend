import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";
import { identity } from "../other/identity";

export interface AuthState {
  loaded: boolean;
  authorized: boolean;
}

export const REDUCER_NAME = "auth";

const initialState: AuthState = {
  loaded: false,
  authorized: false,
};

export const ActionTypes = {
  RESET: `${REDUCER_NAME}/RESET`,
  AUTHORIZE: `${REDUCER_NAME}/AUTHORIZE`,
  UNAUTHORIZE: `${REDUCER_NAME}/UNAUTHORIZE`,
  SAGA_LOGOUT: `${REDUCER_NAME}/SAGA_LOGOUT`,
} as const;

export const Actions = {
  reset: createAction(ActionTypes.RESET),
  authorize: createAction(ActionTypes.AUTHORIZE),
  unauthorize: createAction(ActionTypes.UNAUTHORIZE),
  logout: createAction(ActionTypes.SAGA_LOGOUT),
} as const;

const loadedSelector = (state: RootState) => state.auth.loaded;
const authorizedSelector = (state: RootState) => state.auth.authorized;

export const AUTH_LOADED = createSelector([loadedSelector], identity);
export const AUTH_AUTHORIZED = createSelector([authorizedSelector], identity);

const authReducer = createReducer(initialState, {
  [ActionTypes.AUTHORIZE]: (state) => {
    state.loaded = true;
    state.authorized = true;
  },

  [ActionTypes.UNAUTHORIZE]: (state) => {
    state.loaded = true;
    state.authorized = false;
  },

  [ActionTypes.RESET]: () => initialState,
});

export default authReducer;
