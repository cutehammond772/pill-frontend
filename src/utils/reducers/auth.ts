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

// Saga 로직에서 받는 요청
export const SagaActionTypes = {
  SAGA_LOGOUT: `${REDUCER_NAME}/SAGA_LOGOUT`,
} as const;

// Reducer 요청
export const ReducerActionTypes = {
  RESET: `${REDUCER_NAME}/RESET`,
  AUTHORIZE: `${REDUCER_NAME}/AUTHORIZE`,
  UNAUTHORIZE: `${REDUCER_NAME}/UNAUTHORIZE`,
} as const;

// hook 또는 외부 로직에서의 요청
export const Actions = {
  reset: createAction(ReducerActionTypes.RESET),
  logout: createAction(SagaActionTypes.SAGA_LOGOUT),
} as const;

// saga 로직 등 내부 로직에서의 요청
export const InternalActions = {
  authorize: createAction(ReducerActionTypes.AUTHORIZE),
  unauthorize: createAction(ReducerActionTypes.UNAUTHORIZE),
} as const;

const loadedSelector = (state: RootState) => state.auth.loaded;
const authorizedSelector = (state: RootState) => state.auth.authorized;

export const StaticSelectors = {
  LOADED: createSelector([loadedSelector], identity),
  AUTHORIZED: createSelector([authorizedSelector], identity),
} as const;

const authReducer = createReducer(initialState, {
  [ReducerActionTypes.AUTHORIZE]: (state) => {
    state.loaded = true;
    state.authorized = true;
  },

  [ReducerActionTypes.UNAUTHORIZE]: (state) => {
    state.loaded = true;
    state.authorized = false;
  },

  [ReducerActionTypes.RESET]: () => initialState,
});

export default authReducer;
