import { Reducer } from "redux";
import {
  CategoryReducingType,
  DefaultReducingType,
  IndexContentReducingType,
  IndexReducingType,
  PillData,
  TitleProps,
  IdProps,
  AddIndexContentProps,
  UpdateIndexContentProps,
  RemoveIndexContentProps,
  ExchangeIndexContentProps,
  INITIAL_STATE,
  AddCategoryProps,
  RemoveCategoryProps,
} from "./pill.type";

/* Default */

// 작성 중인 Pill 정보를 모두 초기화
const resetPill = () => ({
  type: DefaultReducingType.RESET,
});

// Pill 제목 변경
const updateTitle = (props: TitleProps) => ({
  type: DefaultReducingType.UPDATE_TITLE,
  ...props,
});

/* Category */

// 카테고리 추가
const addCategory = (props: AddCategoryProps) => ({
  type: CategoryReducingType.ADD,
  ...props,
});

// 카테고리 삭제
const removeCategory = (props: RemoveCategoryProps) => ({
  type: CategoryReducingType.REMOVE,
  ...props,
});

// 카테고리 초기화
const resetCategory = () => ({
  type: CategoryReducingType.RESET,
});

/* Index */

// 인덱스 추가
const addIndex = () => ({
  type: IndexReducingType.ADD,
});

// 인덱스 제목 변경
const updateIndexTitle = (props: IdProps & TitleProps) => ({
  type: IndexReducingType.UPDATE_TITLE,
  ...props,
});

// 인덱스 삭제
const removeIndex = (props: IdProps) => ({
  type: IndexReducingType.REMOVE,
  ...props,
});

/* Content */

// 컨텐츠 추가
const addIndexContent = (props: AddIndexContentProps) => ({
  type: IndexContentReducingType.ADD,
  ...props,
});

// 컨텐츠 내용 변경
const updateIndexContent = (props: UpdateIndexContentProps) => ({
  type: IndexContentReducingType.UPDATE,
  ...props,
});

// 컨텐츠 삭제
const removeIndexContent = (props: RemoveIndexContentProps) => ({
  type: IndexContentReducingType.REMOVE,
  ...props,
});

// 컨텐츠 위치 변경
const exchangeIndexContent = (props: ExchangeIndexContentProps) => ({
  type: IndexContentReducingType.EXCHANGE,
  ...props,
});

/* Type */
type PillReducingAction =
  | ReturnType<typeof resetPill>
  | ReturnType<typeof updateTitle>
  | ReturnType<typeof addCategory>
  | ReturnType<typeof removeCategory>
  | ReturnType<typeof resetCategory>
  | ReturnType<typeof addIndex>
  | ReturnType<typeof updateIndexTitle>
  | ReturnType<typeof removeIndex>
  | ReturnType<typeof addIndexContent>
  | ReturnType<typeof updateIndexContent>
  | ReturnType<typeof removeIndexContent>
  | ReturnType<typeof exchangeIndexContent>;

/* Reducer */
const pillReducer: Reducer<PillData, PillReducingAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case DefaultReducingType.RESET:
      return INITIAL_STATE;
    case DefaultReducingType.UPDATE_TITLE:
      // 제목 문자열 Validation 처리가 필요하다.
      return {
        ...state,
        title: action.title,
      };
    case CategoryReducingType.ADD:
      // 카테고리 문자열 Validation 처리가 필요하다.
      return {
        ...state,
        categories: state.categories.concat({
          categoryId: crypto.randomUUID(),
          category: action.category,
        }),
      };
    case CategoryReducingType.REMOVE:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.categoryId !== action.categoryId
        ),
      };
    case CategoryReducingType.RESET:
      return {
        ...state,
        categories: [],
      };
    case IndexReducingType.ADD:
      return {
        ...state,
        indexes: state.indexes.concat({
          id: crypto.randomUUID(),
          title: "",
          contents: [],
        }),
      };
    case IndexReducingType.REMOVE:
      return {
        ...state,
        indexes: state.indexes.filter((index) => index.id !== action.id),
      };
    case IndexReducingType.UPDATE_TITLE:
      // 제목 문자열 Validation 처리가 필요하다.
      return {
        ...state,
        indexes: state.indexes.map((index) =>
          index.id === action.id ? { ...index, title: action.title } : index
        ),
      };
    case IndexContentReducingType.ADD:
      return {
        ...state,
        indexes: state.indexes.map((index) =>
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
        ...state,
        indexes: state.indexes.map((index) =>
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
        ...state,
        indexes: state.indexes.map((index) =>
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
      const targetIndex = state.indexes.find((index) => index.id === action.id);

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
        ...state,
        indexes: state.indexes.map((index) =>
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
  resetCategory,
  addIndex,
  updateIndexTitle,
  removeIndex,
  addIndexContent,
  updateIndexContent,
  removeIndexContent,
  exchangeIndexContent,
  pillReducer,
};
