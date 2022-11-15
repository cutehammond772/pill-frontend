import { Reducer } from "redux";
import { ContentProps, IdProps } from "../pill.type";
import {
  INITIAL_STATE,
  RollbackData,
  RollbackProps,
  RollbackReducingType,
} from "./rollback.type";

const resetRollbackData = () => ({
  type: RollbackReducingType.RESET,
});

const captureRemovingIndexData = (props: Pick<RollbackProps, "index">) => ({
  type: RollbackReducingType.CAPTURE_INDEX,
  ...props,
});

const removeRollbackIndexData = (props: IdProps) => ({
  type: RollbackReducingType.REMOVE_INDEX,
  ...props,
});

const captureRemovingContentData = (props: Pick<RollbackProps, "content">) => ({
  type: RollbackReducingType.CAPTURE_CONTENT,
  ...props,
});

const removeRollbackContentData = (props: Pick<ContentProps, "contentId">) => ({
  type: RollbackReducingType.REMOVE_CONTENT,
  ...props,
});

type RollbackReducingAction =
  | ReturnType<typeof resetRollbackData>
  | ReturnType<typeof captureRemovingIndexData>
  | ReturnType<typeof removeRollbackIndexData>
  | ReturnType<typeof captureRemovingContentData>
  | ReturnType<typeof removeRollbackContentData>;

const rollbackReducer: Reducer<RollbackData, RollbackReducingAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case RollbackReducingType.RESET:
      return INITIAL_STATE;
    case RollbackReducingType.CAPTURE_INDEX:
      return {
        ...state,
        indexes: state.indexes.concat({
          ...action.index,
          contents: JSON.parse(JSON.stringify(action.index.contents)),
        }),
      };
    case RollbackReducingType.REMOVE_INDEX:
      return {
        ...state,
        indexes: state.indexes.filter((index) => index.id !== action.id),
      };
    case RollbackReducingType.CAPTURE_CONTENT:
      return {
        ...state,
        contents: state.contents.concat({ ...action.content }),
      };
    case RollbackReducingType.REMOVE_CONTENT:
      return {
        ...state,
        contents: state.contents.filter(
          (content) => content.contentId !== action.contentId
        ),
      };
    default:
      return state;
  }
};

export {
  resetRollbackData,
  captureRemovingIndexData,
  captureRemovingContentData,
  removeRollbackIndexData,
  removeRollbackContentData,
  rollbackReducer,
};
