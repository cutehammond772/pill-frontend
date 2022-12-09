import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { PillContentData, PillIndexData } from "../pill/pill.type";
import * as array from "../other/data-structure/smart-array";
import { RootState } from ".";
import { CopyOptions } from "../other/data-structure/options";

export const REDUCER_NAME = "rollback";

export interface RollbackState {
  indexes: Array<PillIndexData>;
  contents: Array<PillContentData>;
}

const initialState: RollbackState = {
  indexes: [],
  contents: [],
};

const copyIndex = (data: PillIndexData) => ({
  ...data,
  contents: data.contents.map((content) => ({ ...content })),
});

// Reducer 요청
export const ReducerActionTypes = {
  RESET: `${REDUCER_NAME}/RESET`,
  CAPTURE_INDEX: `${REDUCER_NAME}/CAPTURE_INDEX`,
  REMOVE_INDEX: `${REDUCER_NAME}/REMOVE_INDEX`,

  CAPTURE_CONTENT: `${REDUCER_NAME}/CAPTURE_CONTENT`,
  REMOVE_CONTENT: `${REDUCER_NAME}/REMOVE_CONTENT`,
} as const;

// saga 로직 등 내부 로직에서의 요청
export const InternalActions = {
  reset: createAction(ReducerActionTypes.RESET),

  captureIndex: createAction<{ data: PillIndexData }>(
    ReducerActionTypes.CAPTURE_INDEX
  ),
  removeIndex: createAction<{ id: string }>(ReducerActionTypes.REMOVE_INDEX),

  captureContent: createAction<{ data: PillContentData }>(
    ReducerActionTypes.CAPTURE_CONTENT
  ),
  removeContent: createAction<{ contentId: string }>(
    ReducerActionTypes.REMOVE_CONTENT
  ),
} as const;

const idFn = (_: RootState, id: string) => id;
const contentIdFn = (_: RootState, contentId: string) => contentId;

const indexSelector = (state: RootState) => state.rollback.indexes;
const contentSelector = (state: RootState) => state.rollback.contents;

export const DynamicSelectors = {
  INDEX: () =>
    createSelector([indexSelector, idFn], (indexes, id) =>
      indexes.find((index) => index.id === id)
    ),

  CONTENT: () =>
    createSelector([contentSelector, contentIdFn], (contents, contentId) =>
      contents.find((content) => content.contentId === contentId)
    ),
} as const;

const rollbackReducer = createReducer(initialState, {
  [ReducerActionTypes.RESET]: () => initialState,

  [ReducerActionTypes.CAPTURE_INDEX]: (
    state,
    action: ReturnType<typeof InternalActions.captureIndex>
  ) =>
    void array.push(
      state.indexes,
      CopyOptions.COPY_NOTHING
    )(copyIndex(action.payload.data)),

  [ReducerActionTypes.REMOVE_INDEX]: (
    state,
    action: ReturnType<typeof InternalActions.removeIndex>
  ) =>
    void (state.indexes = array.remove(state.indexes)(
      (index) => index.id === action.payload.id
    )),

  [ReducerActionTypes.CAPTURE_CONTENT]: (
    state,
    action: ReturnType<typeof InternalActions.captureContent>
  ) =>
    void array.push(
      state.contents,
      CopyOptions.COPY_NOTHING
    )({ ...action.payload.data }),

  [ReducerActionTypes.REMOVE_CONTENT]: (
    state,
    action: ReturnType<typeof InternalActions.removeContent>
  ) =>
    void (state.contents = array.remove(state.contents)(
      (content) => content.contentId === action.payload.contentId
    )),
});

export default rollbackReducer;
