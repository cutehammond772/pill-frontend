import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { identity } from "../../other/identity";

export const REDUCER_NAME = "page/transition";

export const PageTransitions = {
  START: "START",
  IN_TRANSITION: "IN_TRANSITION",
  END: "END",
} as const;

export type PageTransition =
  typeof PageTransitions[keyof typeof PageTransitions];

export interface PageTransitionState {
  state: PageTransition;
}

const initialState: PageTransitionState = {
  state: PageTransitions.END,
};

// Reducer 요청
export const ReducerActionTypes = {
  START_TRANSITION: `${REDUCER_NAME}/START_TRANSITION`,
  IN_TRANSITION: `${REDUCER_NAME}/IN_TRANSITION`,
  END_TRANSITION: `${REDUCER_NAME}/END_TRANSITION`,
} as const;

// hook 또는 외부 로직에서의 요청
export const Actions = {
  startTransition: createAction(ReducerActionTypes.START_TRANSITION),
  inTransition: createAction(ReducerActionTypes.IN_TRANSITION),
  endTransition: createAction(ReducerActionTypes.END_TRANSITION),
} as const;

const stateSelector = (state: RootState) => state.pageTransition.state;

export const StaticSelectors = {
  STATE: createSelector([stateSelector], identity),
} as const;

const pageTransitionReducer = createReducer(initialState, {
  [ReducerActionTypes.START_TRANSITION]: (state) => {
    state.state = PageTransitions.START;
  },

  [ReducerActionTypes.IN_TRANSITION]: (state) => {
    state.state = PageTransitions.IN_TRANSITION;
  },

  [ReducerActionTypes.END_TRANSITION]: (state) => {
    state.state = PageTransitions.END;
  },
});

export default pageTransitionReducer;
