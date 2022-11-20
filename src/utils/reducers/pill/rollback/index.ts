import { Reducer } from "redux";
import { copyContent, copyIndex } from "..";
import { PillContentData, PillIndexData } from "../pill.type";
import {
  INITIAL_STATE,
  RollbackData,
  RollbackReducingType,
} from "./rollback.type";

const resetRollbackData = () => ({
  type: RollbackReducingType.RESET,
});

const captureRemovingIndexData = (data: PillIndexData) => ({
  type: RollbackReducingType.CAPTURE_INDEX,
  data,
});

const removeRollbackIndexData = (id: string) => ({
  type: RollbackReducingType.REMOVE_INDEX,
  id,
});

const captureRemovingContentData = (data: PillContentData) => ({
  type: RollbackReducingType.CAPTURE_CONTENT,
  data,
});

const removeRollbackContentData = (contentId: string) => ({
  type: RollbackReducingType.REMOVE_CONTENT,
  contentId,
});

type RollbackReducingAction =
  | ReturnType<typeof resetRollbackData>
  | ReturnType<typeof captureRemovingIndexData>
  | ReturnType<typeof removeRollbackIndexData>
  | ReturnType<typeof captureRemovingContentData>
  | ReturnType<typeof removeRollbackContentData>;

const copy = (data: RollbackData) => ({
  ...data,
  indexes: data.indexes.map((index) => copyIndex(index)),
  contents: data.contents.map((content) => copyContent(content)),
});

const rollbackReducer: Reducer<RollbackData, RollbackReducingAction> = (
  state = INITIAL_STATE,
  action
) => {
  const copied = copy(state);

  switch (action.type) {
    case RollbackReducingType.RESET:
      return INITIAL_STATE;
    case RollbackReducingType.CAPTURE_INDEX:
      return {
        ...copied,
        indexes: copied.indexes.concat(copyIndex(action.data)),
      };
    case RollbackReducingType.REMOVE_INDEX:
      return {
        ...copied,
        indexes: copied.indexes.filter((index) => index.id !== action.id),
      };
    case RollbackReducingType.CAPTURE_CONTENT:
      return {
        ...copied,
        contents: copied.contents.concat(copyContent(action.data)),
      };
    case RollbackReducingType.REMOVE_CONTENT:
      return {
        ...copied,
        contents: copied.contents.filter(
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
