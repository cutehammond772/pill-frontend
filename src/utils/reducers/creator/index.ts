import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IndexContentProps } from "../../../pages/create/making/index/content/content.type";
import { ImageContent } from "../../../pages/create/making/index/content/image";
import { TextContent } from "../../../pages/create/making/index/content/text";

const REDUCER_NAME = "creator";

const PillContentType = {
  IMAGE: "Image",
  TEXT: "Text",
} as const;

type PillContent = typeof PillContentType[keyof typeof PillContentType];

const PillContentTypeMapper: {
  [type in PillContent]: React.ComponentType<IndexContentProps>;
} = {
  [PillContentType.IMAGE]: ImageContent,
  [PillContentType.TEXT]: TextContent,
} as const;

interface CategoryData {
  categoryId: string;
  category: string;
}

interface PillIndexData {
  id: string;
  title: string;
  contents: Array<PillContentData>;
}

interface PillContentData {
  contentId: string;
  type: PillContent;
  content: string;
  subContent: string;
}

interface CreatorState {
  title: string;
  categories: Array<CategoryData>;
  indexes: Array<PillIndexData>;
}

const initialState: CreatorState = {
  title: "",
  categories: [],
  indexes: [],
};

const creatorSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    reset: () => initialState,
    updateTitle: (state, action: PayloadAction<{ title: string }>) => {
      state.title = action.payload.title;
    },
    addCategory: (state, action: PayloadAction<{ category: string }>) => {
      state.categories.push({
        categoryId: crypto.randomUUID(),
        category: action.payload.category,
      });
    },
    removeCategory: (state, action: PayloadAction<{ categoryId: string }>) => {
      state.categories = state.categories.filter(
        (category) => category.categoryId !== action.payload.categoryId
      );
    },
    resetCategories: (state) => {
      state.categories = [];
    },
    createIndex: (state) => {
      state.indexes.push({
        id: crypto.randomUUID(),
        title: "",
        contents: [],
      });
    },
    updateIndexTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      const index = state.indexes.find(
        (index) => index.id === action.payload.id
      );

      !!index && (index.title = action.payload.title);
    },
    removeIndex: (state, action: PayloadAction<{ id: string }>) => {
      state.indexes = state.indexes.filter(
        (index) => index.id !== action.payload.id
      );
    },
    addContent: (
      state,
      action: PayloadAction<{
        id: string;
        contentType: PillContent;
        content: string;
        subContent?: string;
      }>
    ) => {
      const index = state.indexes.find(
        (index) => index.id === action.payload.id
      );

      !!index &&
        index.contents.push({
          contentId: crypto.randomUUID(),
          type: action.payload.contentType,
          content: action.payload.content,
          subContent: action.payload.subContent || "",
        });
    },
    updateContent: (
      state,
      action: PayloadAction<{
        id: string;
        contentId: string;
        content?: string;
        subContent?: string;
      }>
    ) => {
      const index = state.indexes.find(
        (index) => index.id === action.payload.id
      );

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
    removeContent: (
      state,
      action: PayloadAction<{ id: string; contentId: string }>
    ) => {
      const index = state.indexes.find(
        (index) => index.id === action.payload.id
      );

      !!index &&
        (index.contents = index.contents.filter(
          (content) => content.contentId !== action.payload.contentId
        ));
    },
    exchangeContent: (
      state,
      action: PayloadAction<{
        id: string;
        contentId: string;
        exchangeId: string;
      }>
    ) => {
      const index = state.indexes.find(
        (index) => index.id === action.payload.id
      );

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
  },
});

export const {
  reset,
  updateTitle,
  addCategory,
  removeCategory,
  resetCategories,
  createIndex,
  updateIndexTitle,
  removeIndex,
  addContent,
  updateContent,
  removeContent,
  exchangeContent,
} = creatorSlice.actions;
export { REDUCER_NAME, PillContentType, PillContentTypeMapper };
export type {
  CreatorState,
  PillContent,
  CategoryData,
  PillIndexData,
  PillContentData,
};
export default creatorSlice.reducer;
