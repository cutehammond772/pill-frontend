import { createAction, createReducer } from "@reduxjs/toolkit";
import { PillContentData, PillIndexData } from "../pill/pill.type";
import * as Array from "../other/data-structure/optional-array";
import {
  CopyNothing,
  CopyOptionSignatures,
} from "../other/data-structure/options";

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

const option: CopyNothing = { type: CopyOptionSignatures.COPY_NOTHING };

export const ActionTypes = {
  RESET: `${REDUCER_NAME}/RESET`,
  CAPTURE_INDEX: `${REDUCER_NAME}/CAPTURE_INDEX`,
  REMOVE_INDEX: `${REDUCER_NAME}/REMOVE_INDEX`,

  CAPTURE_CONTENT: `${REDUCER_NAME}/CAPTURE_CONTENT`,
  REMOVE_CONTENT: `${REDUCER_NAME}/REMOVE_CONTENT`,
} as const;

export const InternalActions = {
  reset: createAction(ActionTypes.RESET),

  captureIndex: createAction<{ data: PillIndexData }>(
    ActionTypes.CAPTURE_INDEX
  ),
  removeIndex: createAction<{ id: string }>(ActionTypes.REMOVE_INDEX),

  captureContent: createAction<{ data: PillContentData }>(
    ActionTypes.CAPTURE_CONTENT
  ),
  removeContent: createAction<{ contentId: string }>(
    ActionTypes.REMOVE_CONTENT
  ),
} as const;

const rollbackReducer = createReducer(initialState, {
  [ActionTypes.RESET]: () => initialState,
  
  [ActionTypes.CAPTURE_INDEX]: (
    state,
    action: ReturnType<typeof InternalActions.captureIndex>
  ) => {
    Array.push(copyIndex(action.payload.data), state.indexes, option);
  },

  [ActionTypes.REMOVE_INDEX]: (
    state,
    action: ReturnType<typeof InternalActions.removeIndex>
  ) => {
    Array.removeAll(
      (index) => index.id === action.payload.id,
      state.indexes,
      option
    );
  },

  [ActionTypes.CAPTURE_CONTENT]: (
    state,
    action: ReturnType<typeof InternalActions.captureContent>
  ) => {
    Array.push({ ...action.payload.data }, state.contents, option);
  },

  [ActionTypes.REMOVE_CONTENT]: (
    state,
    action: ReturnType<typeof InternalActions.removeContent>
  ) => {
    Array.removeAll(
      (content) => content.contentId === action.payload.contentId,
      state.contents,
      option
    );
  },
});

export default rollbackReducer;
