import { Reducer } from "redux";
import {
  CategoryReducingType,
  DefaultReducingType,
  IndexContentReducingType,
  IndexReducingType,
  PillData,
  PillContent,
} from "./pill.type";

const INITIAL_PILL: PillData = {
  title: "",
  categories: [],
  indexes: [],
};

/* Default */

// 작성 중인 Pill 정보를 모두 초기화
const resetPill = () => ({
  type: DefaultReducingType.RESET,
});

// Pill 제목 변경
const updateTitle = (title: string) => ({
  type: DefaultReducingType.UPDATE_TITLE,
  title: title,
});

/* Category */

// 카테고리 추가
const addCategory = (category: string) => ({
  type: CategoryReducingType.ADD,
  category: category,
});

// 카테고리 삭제
const removeCategory = (category: string) => ({
  type: CategoryReducingType.REMOVE,
  category: category,
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
const updateIndexTitle = (index: number, title: string) => ({
  type: IndexReducingType.UPDATE_TITLE,
  index: index,
  title: title,
});

// 인덱스 삭제
const removeIndex = (index: number) => ({
  type: IndexReducingType.REMOVE,
  index: index,
});

// 인덱스 삭제 취소
const rollbackIndex = () => ({
  type: IndexReducingType.ROLLBACK,
});

/* Content */

// 컨텐츠 추가
const addIndexContent = (index: number, contentType: PillContent) => ({
  type: IndexContentReducingType.ADD,
  index: index,
  contentType: contentType,
});

// 컨텐츠 내용 변경
const updateIndexContent = (
  index: number,
  contentIndex: number,
  content: string
) => ({
  type: IndexContentReducingType.UPDATE,
  index: index,
  contentIndex: contentIndex,
  content: content,
});

// 컨텐츠 삭제
const removeIndexContent = (index: number, contentIndex: number) => ({
  type: IndexContentReducingType.REMOVE,
  index: index,
  contentIndex: contentIndex,
});

// 컨텐츠 삭제 복구
const rollbackIndexContent = (index: number) => ({
  type: IndexContentReducingType.ROLLBACK,
  index: index,
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
  | ReturnType<typeof rollbackIndex>
  | ReturnType<typeof addIndexContent>
  | ReturnType<typeof updateIndexContent>
  | ReturnType<typeof removeIndexContent>
  | ReturnType<typeof rollbackIndexContent>;

/* Reducer */
const pillReducer: Reducer<PillData, PillReducingAction> = (
  state = INITIAL_PILL,
  action
) => {
  switch (action.type) {
    case DefaultReducingType.RESET:
      return INITIAL_PILL;
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
        categories: state.categories.concat({ name: action.category }),
      };
    case CategoryReducingType.REMOVE:
      return {
        ...state,
        categories: state.categories.filter(
          (categry) => categry.name !== action.category
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
          title: "",
          contents: [],
          key: state.indexes.length,
        }),
      };
    case IndexReducingType.REMOVE:
      // 롤백을 위한 백업 처리가 따로 필요하다.
      // 인덱스 관련 Validation 처리가 따로 필요하다.
      return {
        ...state,
        indexes: state.indexes
          .filter((indexObj) => indexObj.key !== action.index) /* 인덱스 삭제 */
          .map((indexObj, index) => ({
            ...indexObj,
            key: index,
          })) /* 인덱스 순서 재조정 */,
      };
    case IndexReducingType.UPDATE_TITLE:
      // 제목 문자열 Validation 처리가 필요하다.
      return {
        ...state,
        indexes: state.indexes.map((indexObj) =>
          indexObj.key === action.index
            ? { ...indexObj, title: action.title }
            : indexObj
        ),
      };
    case IndexReducingType.ROLLBACK:
      // 미구현
      return INITIAL_PILL;
    case IndexContentReducingType.ADD:
      return {
        ...state,
        indexes: state.indexes.map((indexObj) =>
          indexObj.key === action.index
            ? {
                ...indexObj,
                contents: indexObj.contents.concat({
                  type: action.contentType,
                  content: "",
                  key: indexObj.contents.length,
                }),
              }
            : indexObj
        ),
      };
    case IndexContentReducingType.REMOVE:
      return {
        ...state,
        indexes: state.indexes.map((indexObj) =>
          indexObj.key === action.index
            ? {
                ...indexObj,
                contents: indexObj.contents
                  .filter(
                    (content) => content.key !== action.contentIndex
                  ) /* 컨텐츠 삭제 */
                  .map((content, index) => ({
                    ...content,
                    key: index,
                  })) /* 컨텐츠 순서 재조정 */,
              }
            : indexObj
        ),
      };
    case IndexContentReducingType.UPDATE:
      return {
        ...state,
        indexes: state.indexes.map((indexObj) =>
          indexObj.key === action.index
            ? {
                ...indexObj,
                contents: indexObj.contents.map((content) =>
                  content.key === action.contentIndex
                    ? { ...content, content: action.content }
                    : content
                ),
              }
            : indexObj
        ),
      };
    case IndexContentReducingType.ROLLBACK:
      // 미구현
      return INITIAL_PILL;
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
  rollbackIndex,
  addIndexContent,
  updateIndexContent,
  removeIndexContent,
  rollbackIndexContent,
  pillReducer,
};
