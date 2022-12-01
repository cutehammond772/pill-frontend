import { createAction, createReducer } from "@reduxjs/toolkit";

import {
  CopyNothing,
  CopyOptionSignatures,
} from "../other/data-structure/options";
import * as Array from "../other/data-structure/optional-array";
import { CategoryData, PillContent, PillIndexData } from "../pill/pill.type";

export interface CreatorState {
  title: string;
  categories: Array<CategoryData>;
  indexes: Array<PillIndexData>;

  available: boolean;
}

const initialState: CreatorState = {
  title: "",
  categories: [],
  indexes: [],

  available: false,
};

export const REDUCER_NAME = "creator";

export const ActionTypes = {
  RESET: `${REDUCER_NAME}/RESET`,
  UPDATE_TITLE: `${REDUCER_NAME}/UPDATE_TITLE`,

  ADD_CATEGORY: `${REDUCER_NAME}/ADD_CATEGORY`,
  REMOVE_CATEGORY: `${REDUCER_NAME}/REMOVE_CATEGORY`,
  RESET_CATEGORIES: `${REDUCER_NAME}/RESET_CATEGORIES`,

  CREATE_INDEX: `${REDUCER_NAME}/CREATE_INDEX`,
  UPDATE_INDEX_TITLE: `${REDUCER_NAME}/UPDATE_INDEX_TITLE`,
  REMOVE_INDEX_IMMEDIATELY: `${REDUCER_NAME}/REMOVE_INDEX_IMMEDIATELY`,

  ADD_CONTENT: `${REDUCER_NAME}/ADD_CONTENT`,
  UPDATE_CONTENT: `${REDUCER_NAME}/UPDATE_CONTENT`,
  EXCHANGE_CONTENT: `${REDUCER_NAME}/EXCHANGE_CONTENT`,
  REMOVE_CONTENT_IMMEDIATELY: `${REDUCER_NAME}/REMOVE_CONTENT_IMMEDIATELY`,

  SET_AVAILABLE: `${REDUCER_NAME}/SET_AVAILABLE`,

  SAGA_BEGIN: `${REDUCER_NAME}/SAGA_BEGIN`,
  SAGA_FINISH: `${REDUCER_NAME}/SAGA_FINISH`,

  SAGA_REMOVE_INDEX: `${REDUCER_NAME}/SAGA_REMOVE_INDEX`,
  SAGA_REMOVE_CONTENT: `${REDUCER_NAME}/SAGA_REMOVE_INDEX`,
} as const;

export const Actions = {
  // For Reducer
  reset: createAction(ActionTypes.RESET),
  updateTitle: createAction<{ title: string }>(ActionTypes.UPDATE_TITLE),

  addCategory: createAction<{ category: string }>(ActionTypes.ADD_CATEGORY),
  removeCategory: createAction<{ categoryId: string }>(
    ActionTypes.REMOVE_CATEGORY
  ),
  resetCategories: createAction(ActionTypes.RESET_CATEGORIES),

  createIndex: createAction(ActionTypes.CREATE_INDEX),
  updateIndexTitle: createAction<{ id: string; title: string }>(
    ActionTypes.UPDATE_INDEX_TITLE
  ),
  removeIndexImmadiately: createAction<{ id: string }>(
    ActionTypes.REMOVE_INDEX_IMMEDIATELY
  ),

  addContent: createAction<{
    id: string;
    contentType: PillContent;
    content: string;
    subContent?: string;
  }>(ActionTypes.ADD_CONTENT),

  updateContent: createAction<{
    id: string;
    contentId: string;
    content?: string;
    subContent?: string;
  }>(ActionTypes.UPDATE_CONTENT),

  exchangeContent: createAction<{
    id: string;
    contentId: string;
    exchangeId: string;
  }>(ActionTypes.EXCHANGE_CONTENT),

  removeContentImmadiately: createAction<{ id: string; contentId: string }>(
    ActionTypes.REMOVE_CONTENT_IMMEDIATELY
  ),

  setAvailable: createAction<{ available: boolean }>(ActionTypes.SET_AVAILABLE),

  // For Saga
  begin: createAction(ActionTypes.SAGA_BEGIN),
  finish: createAction(ActionTypes.SAGA_FINISH),

  removeIndex: createAction<{ id: string }>(ActionTypes.SAGA_REMOVE_INDEX),
  removeContent: createAction<{ id: string; contentId: string }>(
    ActionTypes.SAGA_REMOVE_CONTENT
  ),
} as const;

const option: CopyNothing = { type: CopyOptionSignatures.COPY_NOTHING };

const creatorReducer = createReducer(initialState, {
  [ActionTypes.RESET]: () => initialState,

  [ActionTypes.UPDATE_TITLE]: (
    state,
    action: ReturnType<typeof Actions.updateTitle>
  ) => {
    state.title = action.payload.title;
  },

  [ActionTypes.ADD_CATEGORY]: (
    state,
    action: ReturnType<typeof Actions.addCategory>
  ) => {
    Array.push(
      {
        categoryId: crypto.randomUUID(),
        category: action.payload.category,
      },
      state.categories,
      option
    );
  },

  [ActionTypes.REMOVE_CATEGORY]: (
    state,
    action: ReturnType<typeof Actions.removeCategory>
  ) => {
    Array.removeAll(
      (category) => category.categoryId === action.payload.categoryId,
      state.categories,
      option
    );
  },

  [ActionTypes.RESET_CATEGORIES]: (state) => {
    state.categories = [];
  },

  [ActionTypes.CREATE_INDEX]: (state) => {
    Array.push(
      {
        id: crypto.randomUUID(),
        title: "",
        contents: [],
      },
      state.indexes,
      option
    );
  },

  [ActionTypes.UPDATE_INDEX_TITLE]: (
    state,
    action: ReturnType<typeof Actions.updateIndexTitle>
  ) => {
    const index = state.indexes.find((index) => index.id === action.payload.id);
    !!index && (index.title = action.payload.title);
  },

  [ActionTypes.REMOVE_INDEX_IMMEDIATELY]: (
    state,
    action: ReturnType<typeof Actions.removeIndexImmadiately>
  ) => {
    Array.removeAll(
      (index) => index.id === action.payload.id,
      state.indexes,
      option
    );
  },

  [ActionTypes.ADD_CONTENT]: (
    state,
    action: ReturnType<typeof Actions.addContent>
  ) => {
    const index = state.indexes.find((index) => index.id === action.payload.id);

    Array.push(
      {
        contentId: crypto.randomUUID(),
        type: action.payload.contentType,
        content: action.payload.content,
        subContent: action.payload.subContent || "",
      },
      index?.contents,
      option
    );
  },

  [ActionTypes.UPDATE_CONTENT]: (
    state,
    action: ReturnType<typeof Actions.updateContent>
  ) => {
    const index = state.indexes.find((index) => index.id === action.payload.id);

    !!index &&
      (index.contents = index.contents.map((content) =>
        content.contentId === action.payload.contentId
          ? {
              ...content,
              content: action.payload.content || content.subContent,
              subContent: action.payload.subContent || content.subContent,
            }
          : content
      ));
  },

  [ActionTypes.REMOVE_CONTENT_IMMEDIATELY]: (
    state,
    action: ReturnType<typeof Actions.removeContentImmadiately>
  ) => {
    const index = state.indexes.find((index) => index.id === action.payload.id);

    Array.removeAll(
      (content) => content.contentId === action.payload.contentId,
      index?.contents,
      option
    );
  },

  [ActionTypes.EXCHANGE_CONTENT]: (
    state,
    action: ReturnType<typeof Actions.exchangeContent>
  ) => {
    const index = state.indexes.find((index) => index.id === action.payload.id);

    const from = index?.contents.find(
      (content) => content.contentId === action.payload.contentId
    );

    const to = index?.contents.find(
      (content) => content.contentId === action.payload.exchangeId
    );

    !!index &&
      !!from &&
      !!to &&
      (index.contents = index.contents.map((content) =>
        content.contentId === action.payload.contentId
          ? { ...to, contentId: action.payload.contentId }
          : content.contentId === action.payload.exchangeId
          ? { ...from, contentId: action.payload.exchangeId }
          : content
      ));
  },

  [ActionTypes.SET_AVAILABLE]: (
    state,
    action: ReturnType<typeof Actions.setAvailable>
  ) => {
    state.available = action.payload.available;
  },
});

export default creatorReducer;
