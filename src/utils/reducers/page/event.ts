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

// Saga 로직에서 받는 요청
export const SagaActionTypes = {
  // 다른 페이지로 이동하는 시도
  SAGA_NAVIGATE_ATTEMPT: `${REDUCER_NAME}/SAGA_NAVIGATE_ATTEMPT`,

  // window.onload 이벤트
  SAGA_PAGE_LOAD: `${REDUCER_NAME}/SAGA_PAGE_LOAD`,
} as const;

// Reducer 요청
export const ReducerActionTypes = {
  // 처음 로드된 페이지를 빠져나갈 때
  LEAVE_FIRST_PAGE: `${REDUCER_NAME}/LEAVE_FIRST_PAGE`,
} as const;

// hook 또는 외부 로직에서의 요청
export const Actions = {
  attemptNavigation: createAction(SagaActionTypes.SAGA_NAVIGATE_ATTEMPT),
  broadcastLoad: createAction(SagaActionTypes.SAGA_PAGE_LOAD),
};

// saga 로직 등 내부 로직에서의 요청
export const InternalActions = {
  leaveFirstPage: createAction(ReducerActionTypes.LEAVE_FIRST_PAGE),
} as const;

const pageEventSelector = (state: RootState) => state.pageEvent;
const firstPageSelector = (state: RootState) => state.pageEvent.firstPage;

export const StaticSelectors = {
  PAGE_EVENT: createSelector([pageEventSelector], identity),
  FIRST_PAGE: createSelector([firstPageSelector], identity),
} as const;

const pageEventReducer = createReducer(initialState, {
  [ReducerActionTypes.LEAVE_FIRST_PAGE]: (state) => {
    state.firstPage = false;
  },
});

export default pageEventReducer;
