import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";

import { CopyOptions } from "../other/data-structure/options";
import * as array from "../other/data-structure/smart-array";
import { CategoryData, PillContent, PillIndexData } from "../pill/pill.type";
import { RootState } from ".";
import { identity } from "../other/identity";

export interface EditorState {
  title: string;
  categories: Array<CategoryData>;
  indexes: Array<PillIndexData>;

  available: boolean;
}

const initialState: EditorState = {
  title: "",
  categories: [],
  indexes: [],

  available: false,
};

export const REDUCER_NAME = "editor";

// Saga 로직에서 받는 요청
export const SagaActionTypes = {
  SAGA_BEGIN: `${REDUCER_NAME}/SAGA_BEGIN`,
  SAGA_FINISH: `${REDUCER_NAME}/SAGA_FINISH`,

  SAGA_REMOVE_INDEX: `${REDUCER_NAME}/SAGA_REMOVE_INDEX`,
  SAGA_REMOVE_CONTENT: `${REDUCER_NAME}/SAGA_REMOVE_CONTENT`,
} as const;

// Reducer 요청
export const ReducerActionTypes = {
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
} as const;

// hook 또는 외부 로직에서의 요청
export const Actions = {
  updateTitle: createAction<{ title: string }>(ReducerActionTypes.UPDATE_TITLE),

  addCategory: createAction<{ category: string }>(
    ReducerActionTypes.ADD_CATEGORY
  ),

  removeCategory: createAction<{ categoryId: string }>(
    ReducerActionTypes.REMOVE_CATEGORY
  ),

  resetCategories: createAction(ReducerActionTypes.RESET_CATEGORIES),

  createIndex: createAction(ReducerActionTypes.CREATE_INDEX),

  updateIndexTitle: createAction<{ id: string; title: string }>(
    ReducerActionTypes.UPDATE_INDEX_TITLE
  ),

  addContent: createAction<{
    id: string;
    contentType: PillContent;
    content: string;
    subContent?: string;
  }>(ReducerActionTypes.ADD_CONTENT),

  updateContent: createAction<{
    id: string;
    contentId: string;
    content?: string;
    subContent?: string;
  }>(ReducerActionTypes.UPDATE_CONTENT),

  exchangeContent: createAction<{
    id: string;
    contentId: string;
    exchangeId: string;
  }>(ReducerActionTypes.EXCHANGE_CONTENT),

  begin: createAction(SagaActionTypes.SAGA_BEGIN),

  finish: createAction(SagaActionTypes.SAGA_FINISH),

  removeIndex: createAction<{ id: string }>(SagaActionTypes.SAGA_REMOVE_INDEX),

  removeContent: createAction<{ id: string; contentId: string }>(
    SagaActionTypes.SAGA_REMOVE_CONTENT
  ),
} as const;

// saga 로직 등 내부 로직에서의 요청
export const InternalActions = {
  reset: createAction(ReducerActionTypes.RESET),

  setAvailable: createAction<{ available: boolean }>(
    ReducerActionTypes.SET_AVAILABLE
  ),

  removeContentImmadiately: createAction<{ id: string; contentId: string }>(
    ReducerActionTypes.REMOVE_CONTENT_IMMEDIATELY
  ),

  removeIndexImmadiately: createAction<{ id: string }>(
    ReducerActionTypes.REMOVE_INDEX_IMMEDIATELY
  ),
} as const;

const idFn = (_: RootState, id: string) => id;
const contentFn = (_: RootState, __: string, contentId: string) => contentId;

const availableSelector = (state: RootState) => state.editor.available;
const titleSelector = (state: RootState) => state.editor.title;
const categoriesSelector = (state: RootState) => state.editor.categories;
const indexesSelector = (state: RootState) => state.editor.indexes;

export const StaticSelectors = {
  AVAILABLE: createSelector([availableSelector], identity),
  PILL_TITLE: createSelector([titleSelector], identity),
  CATEGORIES: createSelector([categoriesSelector], identity),
  INDEXES: createSelector([indexesSelector], identity),
} as const;

export const DynamicSelectors = {
  INDEX: () =>
    createSelector([indexesSelector, idFn], (indexes, id) =>
      indexes.find((index) => index.id === id)
    ),

  CONTENT: () =>
    createSelector(
      [indexesSelector, idFn, contentFn],
      (indexes, id, contentId) =>
        indexes
          ?.find((index) => index.id === id)
          ?.contents?.find((content) => content.contentId === contentId)
    ),
} as const;

const editorReducer = createReducer(initialState, {
  [ReducerActionTypes.RESET]: () => initialState,

  [ReducerActionTypes.UPDATE_TITLE]: (
    state,
    action: ReturnType<typeof Actions.updateTitle>
  ) => {
    state.title = action.payload.title;
  },

  [ReducerActionTypes.ADD_CATEGORY]: (
    state,
    action: ReturnType<typeof Actions.addCategory>
  ) =>
    void array.push(
      state.categories,
      CopyOptions.COPY_NOTHING
    )({
      categoryId: crypto.randomUUID(),
      category: action.payload.category,
    }),

  [ReducerActionTypes.REMOVE_CATEGORY]: (
    state,
    action: ReturnType<typeof Actions.removeCategory>
  ) =>
    void (state.categories = array.remove(state.categories)(
      (category) => category.categoryId === action.payload.categoryId
    )),

  [ReducerActionTypes.RESET_CATEGORIES]: (state) =>
    void (state.categories = []),

  [ReducerActionTypes.CREATE_INDEX]: (state) =>
    void array.push(
      state.indexes,
      CopyOptions.COPY_NOTHING
    )({
      id: crypto.randomUUID(),
      title: "",
      contents: [],
    }),

  [ReducerActionTypes.UPDATE_INDEX_TITLE]: (
    state,
    action: ReturnType<typeof Actions.updateIndexTitle>
  ) => {
    const index = state.indexes.find((index) => index.id === action.payload.id);
    !!index && (index.title = action.payload.title);
  },

  [ReducerActionTypes.REMOVE_INDEX_IMMEDIATELY]: (
    state,
    action: ReturnType<typeof InternalActions.removeIndexImmadiately>
  ) =>
    void (state.indexes = array.remove(state.indexes)(
      (index) => index.id === action.payload.id
    )),

  [ReducerActionTypes.ADD_CONTENT]: (
    state,
    action: ReturnType<typeof Actions.addContent>
  ) => {
    const index = state.indexes.find((index) => index.id === action.payload.id);

    array.push(
      index?.contents,
      CopyOptions.COPY_NOTHING
    )({
      contentId: crypto.randomUUID(),
      type: action.payload.contentType,
      content: action.payload.content,
      subContent: action.payload.subContent || "",
    });
  },

  [ReducerActionTypes.UPDATE_CONTENT]: (
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

  [ReducerActionTypes.REMOVE_CONTENT_IMMEDIATELY]: (
    state,
    action: ReturnType<typeof InternalActions.removeContentImmadiately>
  ) => {
    const index = state.indexes.find((index) => index.id === action.payload.id);

    !!index &&
      (index.contents = array.remove(index.contents)(
        (content) => content.contentId === action.payload.contentId
      ));
  },

  [ReducerActionTypes.EXCHANGE_CONTENT]: (
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

  [ReducerActionTypes.SET_AVAILABLE]: (
    state,
    action: ReturnType<typeof InternalActions.setAvailable>
  ) => {
    state.available = action.payload.available;
  },
});

export default editorReducer;
