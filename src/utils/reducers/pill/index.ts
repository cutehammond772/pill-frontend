import { Reducer } from "redux";
import {
  CategoryReducingType,
  DefaultReducingType,
  IndexContentReducingType,
  IndexReducingType,
  PillData,
  INITIAL_STATE,
  PillContentData,
  PillIndexData,
  CategoryData,
  PillContent,
} from "./pill.type";

/* Default */

// 작성 중인 Pill 정보를 모두 초기화
const resetPill = () => ({
  type: DefaultReducingType.RESET,
});

// Pill 제목 변경
const updateTitle = (title: string) => ({
  type: DefaultReducingType.UPDATE_TITLE,
  title,
});

/* Category */

// 카테고리 추가
const addCategory = (category: string) => ({
  type: CategoryReducingType.ADD,
  category,
});

// 카테고리 삭제
const removeCategory = (categoryId: string) => ({
  type: CategoryReducingType.REMOVE,
  categoryId,
});

// 카테고리 초기화
const resetCategories = () => ({
  type: CategoryReducingType.RESET,
});

/* Index */

// 인덱스 추가
const addIndex = () => ({
  type: IndexReducingType.ADD,
});

// 인덱스 제목 변경
const updateIndexTitle = (id: string, title: string) => ({
  type: IndexReducingType.UPDATE_TITLE,
  id,
  title,
});

// 인덱스 삭제
const removeIndex = (id: string) => ({
  type: IndexReducingType.REMOVE,
  id,
});

/* Content */

// 컨텐츠 추가
const addIndexContent = (
  id: string,
  contentType: PillContent,
  content: string,
  subContent?: string
) => ({
  type: IndexContentReducingType.ADD,
  id,
  contentType,
  content,
  subContent,
});

// 컨텐츠 내용 변경
const updateIndexContent = (
  id: string,
  contentId: string,
  content: string,
  subContent?: string
) => ({
  type: IndexContentReducingType.UPDATE,
  id,
  contentId,
  content,
  subContent,
});

// 컨텐츠 삭제
const removeIndexContent = (id: string, contentId: string) => ({
  type: IndexContentReducingType.REMOVE,
  id,
  contentId,
});

// 컨텐츠 위치 변경
const exchangeIndexContent = (
  id: string,
  contentId: string,
  exchangeId: string
) => ({
  type: IndexContentReducingType.EXCHANGE,
  id,
  contentId,
  exchangeId,
});

/* Type */
type PillReducingAction =
  | ReturnType<typeof resetPill>
  | ReturnType<typeof updateTitle>
  | ReturnType<typeof addCategory>
  | ReturnType<typeof removeCategory>
  | ReturnType<typeof resetCategories>
  | ReturnType<typeof addIndex>
  | ReturnType<typeof updateIndexTitle>
  | ReturnType<typeof removeIndex>
  | ReturnType<typeof addIndexContent>
  | ReturnType<typeof updateIndexContent>
  | ReturnType<typeof removeIndexContent>
  | ReturnType<typeof exchangeIndexContent>;

// 깊은 복사를 위한 함수
const copyContent = (data: PillContentData) => ({ ...data });
const copyIndex = (data: PillIndexData) => ({
  ...data,
  contents: data.contents.map((content) => copyContent(content)),
});
const copyCategory = (data: CategoryData) => ({ ...data });
const copy = (data: PillData) => ({
  ...data,
  categories: data.categories.map((category) => copyCategory(category)),
  indexes: data.indexes.map((index) => copyIndex(index)),
});

/* Reducer */
const pillReducer: Reducer<PillData, PillReducingAction> = (
  state = INITIAL_STATE,
  action
) => {
  const copied = copy(state);

  switch (action.type) {
    case DefaultReducingType.RESET:
      return INITIAL_STATE;
    case DefaultReducingType.UPDATE_TITLE:
      // 제목 문자열 Validation 처리가 필요하다.
      return {
        ...copied,
        title: action.title,
      };
    case CategoryReducingType.ADD:
      // 카테고리 문자열 Validation 처리가 필요하다.
      return {
        ...copied,
        categories: copied.categories.concat({
          categoryId: crypto.randomUUID(),
          category: action.category,
        }),
      };
    case CategoryReducingType.REMOVE:
      return {
        ...copied,
        categories: copied.categories.filter(
          (category) => category.categoryId !== action.categoryId
        ),
      };
    case CategoryReducingType.RESET:
      return {
        ...copied,
        categories: [],
      };
    case IndexReducingType.ADD:
      return {
        ...copied,
        indexes: copied.indexes.concat({
          id: crypto.randomUUID(),
          title: "",
          contents: [],
        }),
      };
    case IndexReducingType.REMOVE:
      return {
        ...copied,
        indexes: copied.indexes.filter((index) => index.id !== action.id),
      };
    case IndexReducingType.UPDATE_TITLE:
      // 제목 문자열 Validation 처리가 필요하다.
      return {
        ...copied,
        indexes: copied.indexes.map((index) =>
          index.id === action.id ? { ...index, title: action.title } : index
        ),
      };
    case IndexContentReducingType.ADD:
      return {
        ...copied,
        indexes: copied.indexes.map((index) =>
          index.id === action.id
            ? {
                ...index,
                contents: index.contents.concat({
                  contentId: crypto.randomUUID(),
                  type: action.contentType,
                  content: action.content || "",
                  subContent: action.subContent || "",
                }),
              }
            : index
        ),
      };
    case IndexContentReducingType.REMOVE:
      return {
        ...copied,
        indexes: copied.indexes.map((index) =>
          index.id === action.id
            ? {
                ...index,
                contents: index.contents.filter(
                  (content) => content.contentId !== action.contentId
                ),
              }
            : index
        ),
      };
    case IndexContentReducingType.UPDATE:
      return {
        ...copied,
        indexes: copied.indexes.map((index) =>
          index.id === action.id
            ? {
                ...index,
                contents: index.contents.map((content) =>
                  content.contentId === action.contentId
                    ? {
                        ...content,
                        content: action.content || content.subContent,
                        subContent: action.subContent || content.subContent,
                      }
                    : content
                ),
              }
            : index
        ),
      };
    case IndexContentReducingType.EXCHANGE:
      const targetIndex = copied.indexes.find(
        (index) => index.id === action.id
      );

      const from = targetIndex?.contents.find(
        (content) => content.contentId === action.contentId
      );

      const to = targetIndex?.contents.find(
        (content) => content.contentId === action.exchangeId
      );

      if (!targetIndex || !from || !to) {
        throw new Error();
      }

      return {
        ...copied,
        indexes: copied.indexes.map((index) =>
          index.id === action.id
            ? {
                ...targetIndex,
                contents: targetIndex.contents.map((content) =>
                  content.contentId === action.contentId
                    ? { ...to, id: action.contentId }
                    : content.contentId === action.exchangeId
                    ? { ...from, id: action.exchangeId }
                    : content
                ),
              }
            : index
        ),
      };
    default:
      return state;
  }
};

export {
  resetPill,
  updateTitle,
  addCategory,
  removeCategory,
  resetCategories,
  addIndex,
  updateIndexTitle,
  removeIndex,
  addIndexContent,
  updateIndexContent,
  removeIndexContent,
  exchangeIndexContent,
  copyIndex,
  copyCategory,
  copyContent,
  pillReducer,
};
