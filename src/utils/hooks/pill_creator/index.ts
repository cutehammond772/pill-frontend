import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { useCallback } from "react";

import {
  resetPill,
  updateTitle,
  addCategory,
  removeCategory,
  updateCategoryOrder,
  resetCategory,
  addIndex,
  updateIndexTitle,
  removeIndex,
  updateIndexOrder,
  rollbackIndex,
  addIndexContent,
  updateIndexContent,
  removeIndexContent,
  updateIndexContentOrder,
  exchangeIndexContent,
  rollbackIndexContent,
} from "../../reducers/pill";

import {
  Update,
  Add,
  Remove,
  UpdateOrder,
  Rollback,
  Reset,
  ExtraProps,
  UpdateType,
  AddType,
  RemoveType,
  UpdateOrderType,
  RollbackType,
  ResetType,
  Exchange,
  ExchangeType,
} from "./pill_creator.type";

// props 내  number, string prop의 존재 여부는 undefined와 비교하여 결정한다.
// ! 연산자는 zero value나 empty string("")마저 false 값을 반환하기 때문이다.

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
          if (!props || props.index === undefined || !props.contentType) {
            throw new Error();
          }
          dispatch(
            addIndexContent(
              props.index,
              props.contentType,
              props.content,
              props.subContent
            )
          );
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
          if (props.index === undefined) {
            throw new Error();
          }
          dispatch(removeIndex(props.index));
          break;
        case RemoveType.INDEX_CONTENT:
          if (props.index === undefined || props.contentIndex === undefined) {
            throw new Error();
          }
          dispatch(removeIndexContent(props.index, props.contentIndex));
          break;
      }
    },
    [dispatch]
  );

  const updateOrder = useCallback(
    (type: UpdateOrder, props?: ExtraProps) => {
      switch (type) {
        case UpdateOrderType.CATEGORY:
          dispatch(updateCategoryOrder());
          break;
        case UpdateOrderType.INDEX:
          dispatch(updateIndexOrder());
          break;
        case UpdateOrderType.INDEX_CONTENT:
          if (!props || props.index === undefined) {
            throw new Error();
          }
          dispatch(updateIndexContentOrder(props.index));
          break;
      }
    },
    [dispatch]
  );

  const update = useCallback(
    (type: Update, props: ExtraProps) => {
      switch (type) {
        case UpdateType.PILL_TITLE:
          if (props.title === undefined) {
            throw new Error();
          }
          dispatch(updateTitle(props.title));
          break;
        case UpdateType.INDEX_TITLE:
          if (props.index === undefined || props.title === undefined) {
            throw new Error();
          }
          dispatch(updateIndexTitle(props.index, props.title));
          break;
        case UpdateType.INDEX_CONTENT:
          if (
            props.index === undefined ||
            props.contentIndex === undefined ||
            props.content === undefined
          ) {
            throw new Error();
          }
          dispatch(
            updateIndexContent(
              props.index,
              props.contentIndex,
              props.content,
              props.subContent
            )
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
          if (!props || props.index === undefined) {
            throw new Error();
          }
          dispatch(rollbackIndexContent(props.index));
          break;
      }
    },
    [dispatch]
  );

  const exchange = useCallback(
    (type: Exchange, props: ExtraProps) => {
      switch (type) {
        case ExchangeType.INDEX_CONTENT:
          if (
            props.index === undefined ||
            props.contentIndex === undefined ||
            props.exchangeContentIndex === undefined
          ) {
            throw new Error();
          }
          dispatch(
            exchangeIndexContent(
              props.index,
              props.contentIndex,
              props.exchangeContentIndex
            )
          );
          break;
      }
    },
    [dispatch]
  );

  return { data, add, reset, remove, updateOrder, update, rollback, exchange };
};

export { usePillCreator };
