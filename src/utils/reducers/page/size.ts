import { createAction, createReducer } from "@reduxjs/toolkit";

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

export const ActionTypes = {
  UPDATE_PAGE_HEIGHT: `${REDUCER_NAME}/UPDATE_PAGE_HEIGHT`,
  UPDATE_HEADER_HEIGHT: `${REDUCER_NAME}/UPDATE_HEADER_HEIGHT`,
  UPDATE_FOOTER_HEIGHT: `${REDUCER_NAME}/UPDATE_FOOTER_HEIGHT`,

  SAGA_UPDATE_PAGE_HEIGHT: `${REDUCER_NAME}/SAGA_UPDATE_PAGE_HEIGHT`,
  SAGA_UPDATE_HEADER_HEIGHT: `${REDUCER_NAME}/SAGA_UPDATE_HEADER_HEIGHT`,
  SAGA_UPDATE_FOOTER_HEIGHT: `${REDUCER_NAME}/SAGA_UPDATE_FOOTER_HEIGHT`,
} as const;

export const Actions = {
  // For Saga
  updatePageHeight: createAction<{ pageHeight: number }>(
    ActionTypes.SAGA_UPDATE_PAGE_HEIGHT
  ),
  updateHeaderHeight: createAction<{ headerHeight: number }>(
    ActionTypes.SAGA_UPDATE_HEADER_HEIGHT
  ),
  updateFooterHeight: createAction<{ footerHeight: number }>(
    ActionTypes.SAGA_UPDATE_FOOTER_HEIGHT
  ),
} as const;

export const InternalActions = {
  // For Reducer
  updatePageHeight: createAction<{ pageHeight: number }>(
    ActionTypes.UPDATE_PAGE_HEIGHT
  ),
  updateHeaderHeight: createAction<{ headerHeight: number }>(
    ActionTypes.UPDATE_HEADER_HEIGHT
  ),
  updateFooterHeight: createAction<{ footerHeight: number }>(
    ActionTypes.UPDATE_FOOTER_HEIGHT
  ),
} as const;

const pageReducer = createReducer(initialState, {
  [ActionTypes.UPDATE_PAGE_HEIGHT]: (
    state,
    action: ReturnType<typeof Actions.updatePageHeight>
  ) => {
    state.pageHeight = action.payload.pageHeight;
  },

  [ActionTypes.UPDATE_HEADER_HEIGHT]: (
    state,
    action: ReturnType<typeof Actions.updateHeaderHeight>
  ) => {
    state.headerHeight = action.payload.headerHeight;
  },

  [ActionTypes.UPDATE_FOOTER_HEIGHT]: (
    state,
    action: ReturnType<typeof Actions.updateFooterHeight>
  ) => {
    state.footerHeight = action.payload.footerHeight;
  },
});

export default pageReducer;
