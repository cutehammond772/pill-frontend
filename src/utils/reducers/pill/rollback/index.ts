import { Reducer } from "redux";
import { copyContent, copyIndex } from "..";
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

const removeRollbackIndexData = (props: {id: string}) => ({
  type: RollbackReducingType.REMOVE_INDEX,
  ...props,
});

const captureRemovingContentData = (props: Pick<RollbackProps, "content">) => ({
  type: RollbackReducingType.CAPTURE_CONTENT,
  ...props,
});

const removeRollbackContentData = (props: {contentId: string}) => ({
  type: RollbackReducingType.REMOVE_CONTENT,
  ...props,
});

type RollbackReducingAction =
  | ReturnType<typeof resetRollbackData>
  | ReturnType<typeof captureRemovingIndexData>
  | ReturnType<typeof removeRollbackIndexData>
  | ReturnType<typeof captureRemovingContentData>
  | ReturnType<typeof removeRollbackContentData>;

const copy = (data: RollbackData) => ({
  ...data,
  indexes: data.indexes.map(index => copyIndex(index)),
  contents: data.contents.map(content => copyContent(content)),
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
        indexes: copied.indexes.concat(copyIndex(action.index)),
      };
    case RollbackReducingType.REMOVE_INDEX:
      return {
        ...copied,
        indexes: copied.indexes.filter((index) => index.id !== action.id),
      };
    case RollbackReducingType.CAPTURE_CONTENT:
      return {
        ...copied,
        contents: copied.contents.concat(copyContent(action.content)),
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
