import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";

import * as reducer from "../../reducers/pill";

import { PillContent } from "../../reducers/pill/pill.type";

interface IdProps {
  id: string;
}

interface ContentProps {
  id: string;
  contentId: string;
}

interface TitleProps {
  title: string;
}

interface AddContentProps {
  contentType: PillContent;
  content: string;
  subContent?: string;
}

interface UpdateContentProps {
  content: string;
  subContent?: string;
}

interface ExchangeContentProps {
  contentId: string;
  exchangeId: string;
}

interface AddCategoryProps {
  category: string;
}

interface RemoveCategoryProps {
  categoryId: string;
}

const usePillDefaultEditor = () => {
  const dispatch = useDispatch();

  // Raw Data
  const title = useSelector((state: RootState) => state.pill.title);
  const categories = useSelector((state: RootState) => state.pill.categories);

  const addIndex = () => dispatch(reducer.addIndex());

  const addCategory = (props: AddCategoryProps) => {
    if (categories.find((category) => category.category === props.category)) {
      throw new Error();
    }

    dispatch(reducer.addCategory(props));
  };

  const removeCategory = (props: RemoveCategoryProps) => {
    if (
      !categories.find((category) => category.categoryId === props.categoryId)
    ) {
      throw new Error();
    }

    dispatch(reducer.removeCategory(props));
  };

  const updateTitle = (props: { title: string }) =>
    dispatch(reducer.updateTitle(props));

  const resetAll = () => dispatch(reducer.resetPill());
  const resetCategories = () => dispatch(reducer.resetCategories());

  return {
    title,
    categories,
    addIndex,
    addCategory,
    removeCategory,
    updateTitle,
    resetAll,
    resetCategories,
  };
};

const usePillOrder = () => {
  const data = useSelector((state: RootState) => state.pill);

  const getIndexOrder = (props: IdProps) => {
    const order = data.indexes.findIndex((index) => index.id === props.id);

    // Validation
    if (order === -1) {
      throw new Error();
    }

    return order;
  };

  const getContentOrder = (props: ContentProps) => {
    const index = data.indexes.find((index) => index.id === props.id);

    if (!index) {
      throw new Error();
    }

    const order = index.contents.findIndex(
      (content) => content.contentId === props.contentId
    );

    // Validation
    if (order === -1) {
      throw new Error();
    }

    return order;
  };

  return { getIndexOrder, getContentOrder };
};

const usePillIndexEditor = (idProps: IdProps) => {
  const dispatch = useDispatch();

  const index = useSelector((state: RootState) =>
    state.pill.indexes.find((index) => index.id === idProps.id)
  );

  if (!index) {
    throw new Error();
  }

  const addContent = (props: AddContentProps) =>
    dispatch(reducer.addIndexContent({ ...idProps, ...props }));

  const exchangeContent = (props: ExchangeContentProps) =>
    dispatch(reducer.exchangeIndexContent({ ...idProps, ...props }));

  const updateTitle = (props: TitleProps) =>
    dispatch(reducer.updateIndexTitle({ ...idProps, ...props }));

  const remove = () => dispatch(reducer.removeIndex(idProps));

  return {
    index,
    addContent,
    exchangeContent,
    updateTitle,
    remove,
  };
};

const usePillContentEditor = (contentProps: ContentProps) => {
  const dispatch = useDispatch();

  const content = useSelector((state: RootState) =>
    state.pill.indexes
      .find((index) => index.id === contentProps.id)
      ?.contents.find((content) => content.contentId === contentProps.contentId)
  );

  if (!content) {
    throw new Error();
  }

  const update = (props: UpdateContentProps) =>
    dispatch(reducer.updateIndexContent({ ...contentProps, ...props }));

  const remove = () =>
    dispatch(reducer.removeIndexContent({ ...contentProps }));

  return { content, update, remove };
};

export {
  usePillDefaultEditor,
  usePillIndexEditor,
  usePillContentEditor,
  usePillOrder,
};
