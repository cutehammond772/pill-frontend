import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { identity } from "../../other/identity";

export const REDUCER_NAME = "page/event";

export interface PageEventState {
  firstPage: boolean;
}

const initialState: PageEventState = {
  firstPage: true,
};

export const ActionTypes = {
  LEAVE_FIRST_PAGE: `${REDUCER_NAME}/LEAVE_FIRST_PAGE`,

  SAGA_NAVIGATE_ATTEMPT: `${REDUCER_NAME}/SAGA_NAVIGATE_ATTEMPT`,
  SAGA_PAGE_LOAD: `${REDUCER_NAME}/SAGA_PAGE_LOAD`,
} as const;

export const Actions = {
  attemptNavigation: createAction(ActionTypes.SAGA_NAVIGATE_ATTEMPT),
  broadcastLoad: createAction(ActionTypes.SAGA_PAGE_LOAD),
};

export const InternalActions = {
  leaveFirstPage: createAction(ActionTypes.LEAVE_FIRST_PAGE),
} as const;

const selector = (state: RootState) => state.pageEvent;
export const PAGE_EVENT_FIRST_PAGE = createSelector([selector], (event) => event.firstPage);

const pageEventReducer = createReducer(initialState, {
  [ActionTypes.LEAVE_FIRST_PAGE]: (state) => {
      state.firstPage = false;
  },
});

export default pageEventReducer;