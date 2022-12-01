import { createAction, createReducer } from "@reduxjs/toolkit";

export const REDUCER_NAME = "transition";

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

export const ActionTypes = {
  START_TRANSITION: `${REDUCER_NAME}/START_TRANSITION`,
  IN_TRANSITION: `${REDUCER_NAME}/IN_TRANSITION`,
  END_TRANSITION: `${REDUCER_NAME}/END_TRANSITION`,
} as const;

export const Actions = {
  // For Reducer
  startTransition: createAction(ActionTypes.START_TRANSITION),
  inTransition: createAction(ActionTypes.IN_TRANSITION),
  endTransition: createAction(ActionTypes.END_TRANSITION),
} as const;

const pageTransitionReducer = createReducer(initialState, {
  [ActionTypes.START_TRANSITION]: (state) => {
    state.state = PageTransitions.START;
  },

  [ActionTypes.IN_TRANSITION]: (state) => {
    state.state = PageTransitions.IN_TRANSITION;
  },

  [ActionTypes.END_TRANSITION]: (state) => {
    state.state = PageTransitions.END;
  },
});

export default pageTransitionReducer;
