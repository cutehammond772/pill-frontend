import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IndexContentProps } from "../../pages/create/making/index/content/content.type";
import { ImageContent } from "../../pages/create/making/index/content/image";
import { TextContent } from "../../pages/create/making/index/content/text";
import {
  CopyNothing,
  CopyOptionSignatures,
} from "../other/data-structure/options";
import * as Array from "../other/data-structure/optional-array";

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

const option: CopyNothing = { type: CopyOptionSignatures.COPY_NOTHING };

const creatorSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    reset: () => initialState,

    updateTitle: (state, action: PayloadAction<{ title: string }>) => {
      state.title = action.payload.title;
    },

    addCategory: (state, action: PayloadAction<{ category: string }>) => {
      Array.push(
        {
          categoryId: crypto.randomUUID(),
          category: action.payload.category,
        },
        state.categories,
        option
      );
    },

    removeCategory: (state, action: PayloadAction<{ categoryId: string }>) => {
      Array.removeAll(
        (category) => category.categoryId !== action.payload.categoryId,
        state.categories,
        option
      );
    },

    resetCategories: (state) => {
      state.categories = [];
    },

    createIndex: (state) => {
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
      Array.removeAll(
        (index) => index.id !== action.payload.id,
        state.indexes,
        option
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
        Array.push(
          {
            contentId: crypto.randomUUID(),
            type: action.payload.contentType,
            content: action.payload.content,
            subContent: action.payload.subContent || "",
          },
          index.contents,
          option
        );
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
        Array.removeAll(
          (content) => content.contentId !== action.payload.contentId,
          index.contents,
          option
        );
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
