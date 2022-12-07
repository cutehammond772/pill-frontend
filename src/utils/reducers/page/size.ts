import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { identity } from "../../other/identity";

export const REDUCER_NAME = "page/size";

export interface PageState {
  pageHeight: number;
  headerHeight: number;
  footerHeight: number;
}

const initialState: PageState = {
  pageHeight: 0,
  headerHeight: 0,
  footerHeight: 0,
};

// Saga 로직에서 받는 요청
export const SagaActionTypes = {
  SAGA_UPDATE_PAGE_HEIGHT: `${REDUCER_NAME}/SAGA_UPDATE_PAGE_HEIGHT`,
  SAGA_UPDATE_HEADER_HEIGHT: `${REDUCER_NAME}/SAGA_UPDATE_HEADER_HEIGHT`,
  SAGA_UPDATE_FOOTER_HEIGHT: `${REDUCER_NAME}/SAGA_UPDATE_FOOTER_HEIGHT`,
} as const;

// Reducer 요청
export const ReducerActionTypes = {
  UPDATE_PAGE_HEIGHT: `${REDUCER_NAME}/UPDATE_PAGE_HEIGHT`,
  UPDATE_HEADER_HEIGHT: `${REDUCER_NAME}/UPDATE_HEADER_HEIGHT`,
  UPDATE_FOOTER_HEIGHT: `${REDUCER_NAME}/UPDATE_FOOTER_HEIGHT`,
} as const;

// hook 또는 외부 로직에서의 요청
export const Actions = {
  updatePageHeight: createAction<{ pageHeight: number }>(
    SagaActionTypes.SAGA_UPDATE_PAGE_HEIGHT
  ),
  updateHeaderHeight: createAction<{ headerHeight: number }>(
    SagaActionTypes.SAGA_UPDATE_HEADER_HEIGHT
  ),
  updateFooterHeight: createAction<{ footerHeight: number }>(
    SagaActionTypes.SAGA_UPDATE_FOOTER_HEIGHT
  ),
} as const;

// saga 로직 등 내부 로직에서의 요청
export const InternalActions = {
  updatePageHeight: createAction<{ pageHeight: number }>(
    ReducerActionTypes.UPDATE_PAGE_HEIGHT
  ),
  updateHeaderHeight: createAction<{ headerHeight: number }>(
    ReducerActionTypes.UPDATE_HEADER_HEIGHT
  ),
  updateFooterHeight: createAction<{ footerHeight: number }>(
    ReducerActionTypes.UPDATE_FOOTER_HEIGHT
  ),
} as const;

const pageSelector = (state: RootState) => state.page;
const pageHeightSelector = (state: RootState) => state.page.pageHeight;
const headerHeightSelector = (state: RootState) => state.page.headerHeight;
const footerHeightSelector = (state: RootState) => state.page.footerHeight;

export const StaticSelectors = {
  PAGE: createSelector([pageSelector], identity),
  PAGE_HEIGHT: createSelector([pageHeightSelector], identity),
  HEADER_HEIGHT: createSelector([headerHeightSelector], identity),
  FOOTER_HEIGHT: createSelector([footerHeightSelector], identity),
} as const;

const pageReducer = createReducer(initialState, {
  [ReducerActionTypes.UPDATE_PAGE_HEIGHT]: (
    state,
    action: ReturnType<typeof InternalActions.updatePageHeight>
  ) => {
    state.pageHeight = action.payload.pageHeight;
  },

  [ReducerActionTypes.UPDATE_HEADER_HEIGHT]: (
    state,
    action: ReturnType<typeof InternalActions.updateHeaderHeight>
  ) => {
    state.headerHeight = action.payload.headerHeight;
  },

  [ReducerActionTypes.UPDATE_FOOTER_HEIGHT]: (
    state,
    action: ReturnType<typeof InternalActions.updateFooterHeight>
  ) => {
    state.footerHeight = action.payload.footerHeight;
  },
});

export default pageReducer;
