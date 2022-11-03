import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { useCallback } from "react";

import {
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
} from "../../reducers/pill";

import {
  Update,
  Add,
  Remove,
  Rollback,
  Reset,
  ExtraProps,
  UpdateType,
  AddType,
  RemoveType,
  RollbackType,
  ResetType,
} from "./pill_creator.type";

const usePillCreator = () => {
  const dispatch = useDispatch();

  // PillData
  const data = useSelector((state: RootState) => state.pill);

  const add = useCallback(
    (type: Add, props?: ExtraProps) => {
      switch (type) {
        case AddType.CATEGORY:
          if (!props || !props.category) {
            throw new Error();
          }
          dispatch(addCategory(props.category));
          break;
        case AddType.INDEX:
          dispatch(addIndex());
          break;
        case AddType.INDEX_CONTENT:
          if (!props || !props.index || !props.contentType) {
            throw new Error();
          }
          dispatch(addIndexContent(props.index, props.contentType));
          break;
      }
    },
    [dispatch]
  );

  const reset = useCallback(
    (type: Reset) => {
      switch (type) {
        case ResetType.CATEGORY:
          dispatch(resetCategory());
          break;
        case ResetType.PILL:
          dispatch(resetPill());
          break;
      }
    },
    [dispatch]
  );

  const remove = useCallback(
    (type: Remove, props: ExtraProps) => {
      switch (type) {
        case RemoveType.CATEGORY:
          if (!props.category) {
            throw new Error();
          }
          dispatch(removeCategory(props.category));
          break;
        case RemoveType.INDEX:
          if (!props.index) {
            throw new Error();
          }
          dispatch(removeIndex(props.index));
          break;
        case RemoveType.INDEX_CONTENT:
          if (!props.index || !props.contentIndex) {
            throw new Error();
          }
          dispatch(removeIndexContent(props.index, props.contentIndex));
          break;
      }
    },
    [dispatch]
  );

  const update = useCallback(
    (type: Update, props: ExtraProps) => {
      switch (type) {
        case UpdateType.PILL_TITLE:
          if (!props.title) {
            throw new Error();
          }
          dispatch(updateTitle(props.title));
          break;
        case UpdateType.INDEX_TITLE:
          if (!props.index || !props.title) {
            throw new Error();
          }
          dispatch(updateIndexTitle(props.index, props.title));
          break;
        case UpdateType.INDEX_CONTENT:
          if (!props.index || !props.contentIndex || !props.content) {
            throw new Error();
          }
          dispatch(
            updateIndexContent(props.index, props.contentIndex, props.content)
          );
          break;
      }
    },
    [dispatch]
  );

  const rollback = useCallback(
    (type: Rollback, props?: ExtraProps) => {
      switch (type) {
        case RollbackType.INDEX:
          dispatch(rollbackIndex());
          break;
        case RollbackType.INDEX_CONTENT:
          if (!props || !props.index) {
            throw new Error();
          }
          dispatch(rollbackIndexContent(props.index));
          break;
      }
    },
    [dispatch]
  );

  return { data, add, reset, remove, update, rollback };
};

export { usePillCreator };
