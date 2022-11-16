import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { useCallback } from "react";

import * as reducer from "../../reducers/pill";

import {
  AddCategoryProps,
  AddIndexContentProps,
  ContentProps,
  ExchangeIndexContentProps,
  IdProps,
  RemoveCategoryProps,
  RemoveIndexContentProps,
  TitleProps,
  UpdateIndexContentProps,
} from "../../reducers/pill/pill.type";

const usePillCreator = () => {
  const dispatch = useDispatch();

  // Raw Data
  const data = useSelector((state: RootState) => state.pill);

  // Validated Data
  const getIndex = (props: IdProps) => {
    const index = data.indexes.find((index) => index.id === props.id);

    // Validation
    if (!index) {
      throw new Error();
    }

    return index;
  };

  const getContent = (props: ContentProps) => {
    const content = getIndex({ id: props.id }).contents.find(
      (content) => content.contentId === props.contentId
    );

    // Validation
    if (!content) {
      throw new Error();
    }

    return content;
  };

  const getIndexOrder = (props: IdProps) => {
    const order = data.indexes.findIndex((index) => index.id === props.id);

    // Validation
    if (order === -1) {
      throw new Error();
    }

    return order;
  };

  const getContentOrder = (props: ContentProps) => {
    const index = getIndex(props);
    const order = index.contents.findIndex(
      (content) => content.contentId === props.contentId
    );

    // Validation
    if (order === -1) {
      throw new Error();
    }

    return order;
  };

  // Function
  const withIndex = useCallback(
    (idProps: IdProps) => {
      const addContent = (props: Omit<AddIndexContentProps, "id">) =>
        dispatch(reducer.addIndexContent({ ...idProps, ...props }));

      const updateContent = (props: Omit<UpdateIndexContentProps, "id">) =>
        dispatch(reducer.updateIndexContent({ ...idProps, ...props }));

      const removeContent = (props: Omit<RemoveIndexContentProps, "id">) =>
        dispatch(reducer.removeIndexContent({ ...idProps, ...props }));

      const exchangeContent = (props: Omit<ExchangeIndexContentProps, "id">) =>
        dispatch(reducer.exchangeIndexContent({ ...idProps, ...props }));

      const updateTitle = (props: TitleProps) =>
        dispatch(reducer.updateIndexTitle({ ...idProps, ...props }));

      const remove = () => dispatch(reducer.removeIndex(idProps));

      return {
        addContent,
        updateContent,
        removeContent,
        exchangeContent,
        updateTitle,
        remove,
      };
    },
    [dispatch]
  );

  const addIndex = () => dispatch(reducer.addIndex());

  // Validation 위치에 대해 고민할 필요가 있다.
  const addCategory = (props: AddCategoryProps) => {
    if (
      data.categories.find((category) => category.category === props.category)
    ) {
      throw new Error();
    }

    dispatch(reducer.addCategory(props));
  };

  const removeCategory = (props: RemoveCategoryProps) => {
    if (
      !data.categories.find(
        (category) => category.categoryId === props.categoryId
      )
    ) {
      throw new Error();
    }

    dispatch(reducer.removeCategory(props));
  };

  const updateTitle = (title: string) =>
    dispatch(reducer.updateTitle({ title }));

  const resetAll = () => dispatch(reducer.resetPill());
  const resetCategory = () => dispatch(reducer.resetCategory());

  return {
    data,
    getIndex,
    getContent,
    getIndexOrder,
    getContentOrder,
    withIndex,
    addIndex,
    addCategory,
    removeCategory,
    updateTitle,
    resetAll,
    resetCategory,
  };
};

export { usePillCreator };
