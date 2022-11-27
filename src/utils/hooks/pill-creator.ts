import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";

import * as reducer from "../reducers/creator";
import { PillContent } from "../reducers/creator";
import { useRollback } from "./rollback";

// Pill의 제목이나 카테고리, 빈 인덱스 추가 등을 담당한다.
const usePillDefaultEditor = () => {
  const dispatch = useDispatch();
  const rollback = useRollback();

  // 바로 접근할 수 있는 데이터이다.
  const title = useSelector((state: RootState) => state.creator.title);
  const categories = useSelector(
    (state: RootState) => state.creator.categories
  );

  // 롤백 데이터 저장을 위한 인덱스이다.
  // 추후 수정
  const indexes = useSelector((state: RootState) => state.creator.indexes);

  // 새로운 빈 인덱스를 추가한다.
  const addIndex = useCallback(
    () => dispatch(reducer.createIndex()),
    [dispatch]
  );

  // 새로운 카테고리를 추가한다.
  const addCategory = useCallback(
    (category: string) => {
      if (categories.find((c) => c.category === category)) {
        throw new Error();
      }

      dispatch(reducer.addCategory({ category }));
    },
    [categories, dispatch]
  );

  // 카테고리를 삭제한다.
  const removeCategory = useCallback(
    (categoryId: string) => {
      if (!categories.find((c) => c.categoryId === categoryId)) {
        throw new Error();
      }

      dispatch(reducer.removeCategory({ categoryId }));
    },
    [categories, dispatch]
  );

  // 제목을 업데이트한다.
  const updateTitle = useCallback(
    (title: string) => dispatch(reducer.updateTitle({ title })),
    [dispatch]
  );

  // Pill의 모든 내용을 초기화한다.
  const resetAll = useCallback(() => {
    // 인덱스 데이터를 롤백 데이터에 저장한다.
    indexes.forEach((index) => rollback.captureIndex(index));

    dispatch(reducer.reset());
  }, [indexes, rollback, dispatch]);

  // 카테고리를 초기화한다.
  const resetCategories = useCallback(
    () => dispatch(reducer.resetCategories()),
    [dispatch]
  );

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

// 인덱스 또는 카테고리의 순서(=위치)를 구하는 데 사용한다.
const usePillOrder = () => {
  const indexes = useSelector((state: RootState) => state.creator.indexes);

  // id를 가진 인덱스의 순서를 구한다.
  const getIndexOrder = useCallback(
    (id: string) => {
      const order = indexes.findIndex((index) => index.id === id);

      if (order === -1) {
        // 존재하지 않는 id를 참조한 경우
        throw new Error();
      }

      return order;
    },
    [indexes]
  );

  // contentId를 가진 컨텐트의 순서를 구한다.
  const getContentOrder = useCallback(
    (id: string, contentId: string) => {
      const index = indexes.find((index) => index.id === id);

      if (!index) {
        // 존재하지 않는 id를 참조한 경우
        throw new Error();
      }

      const order = index.contents.findIndex(
        (content) => content.contentId === contentId
      );

      if (order === -1) {
        // 존재하지 않는 contentId를 참조한 경우
        throw new Error();
      }

      return order;
    },
    [indexes]
  );

  return { getIndexOrder, getContentOrder };
};

// id를 가진 인덱스를 편집하는 데 사용한다.
// 롤백 데이터가 존재하는 경우 삭제된 인덱스도 접근이 가능하다.
const usePillIndexEditor = (id: string) => {
  const dispatch = useDispatch();
  const rollback = useRollback();

  const rollbackIndex = rollback.getIndex(id);
  const removed = !!rollbackIndex;

  // 삭제된 데이터인 경우 롤백 데이터를 대신 반환한다.
  const index = useSelector((state: RootState) =>
    state.creator.indexes.find((index) => index.id === id)
  );

  if (!index && !removed) {
    // 존재하지 않는 id를 참조한 경우
    throw new Error();
  }

  // 인덱스를 편집하기 전 삭제된 인덱스인지 확인한다.
  const checkRemoved = useCallback(
    (callbackFn: () => void) => {
      if (removed) {
        // 삭제된 인덱스인 경우
        throw new Error();
      }

      callbackFn();
    },
    [removed]
  );

  // 새로운 컨텐트를 추가한다.
  const addContent = useCallback(
    (contentType: PillContent, content: string, subContent?: string) =>
      checkRemoved(() =>
        dispatch(reducer.addContent({ id, contentType, content, subContent }))
      ),
    [dispatch, checkRemoved, id]
  );

  // 동일한 인덱스 내의 컨텐트 위치를 바꾼다.
  const exchangeContent = useCallback(
    (contentId: string, exchangeId: string) =>
      checkRemoved(() =>
        dispatch(reducer.exchangeContent({ id, contentId, exchangeId }))
      ),
    [dispatch, checkRemoved, id]
  );

  // 인덱스의 제목을 업데이트한다.
  const updateTitle = useCallback(
    (title: string) =>
      checkRemoved(() => dispatch(reducer.updateIndexTitle({ id, title }))),
    [dispatch, checkRemoved, id]
  );

  // 인덱스를 삭제한다. 이때 자동으로 롤백 데이터에 추가된다.
  const remove = useCallback(
    () =>
      checkRemoved(() => {
        !!index && rollback.captureIndex(index);
        dispatch(reducer.removeIndex({ id }));
      }),
    [dispatch, checkRemoved, id, index, rollback]
  );

  const getIndex = () => {
    if (removed) {
      return rollbackIndex;
    }

    if (!index) {
      throw new Error();
    }

    return index;
  };

  return {
    index: getIndex(),
    removed,
    addContent,
    exchangeContent,
    updateTitle,
    remove,
  };
};

// contentId를 가진 컨텐트를 편집하는 데 사용한다.
// 롤백 데이터가 존재하는 경우 삭제된 컨텐트도 접근이 가능하다.
const usePillContentEditor = (id: string, contentId: string) => {
  const dispatch = useDispatch();
  const rollback = useRollback();

  const rollbackIndex = rollback.getIndex(id);
  const rollbackContent = rollback.getContent(contentId);

  // 컨텐트의 삭제 경로는
  // 1. 인덱스를 통째로 삭제하여 그 안의 컨텐츠까지 모두 삭제됨
  // 2. 인덱스 내에서 특정한 컨텐트를 삭제함
  // 두 가지가 있으므로 둘 다 모두 고려한다.
  const removed = !!rollbackIndex || !!rollbackContent;

  // 삭제된 데이터인 경우 롤백 데이터를 대신 반환한다.
  const content = useSelector((state: RootState) =>
    state.creator.indexes
      .find((index) => index.id === id)
      ?.contents.find((content) => content.contentId === contentId)
  );

  if (!content && !removed) {
    // 존재하지 않는 컨텐트를 참조한 경우
    throw new Error();
  }

  // 컨텐트를 편집하기 전 삭제된 컨텐트인지 확인한다.
  const checkRemoved = useCallback(
    (callbackFn: () => void) => {
      if (removed) {
        // 삭제된 컨텐트인 경우
        throw new Error();
      }

      callbackFn();
    },
    [removed]
  );

  // 컨텐트 내용을 업데이트한다.
  const update = useCallback(
    (content: string, subContent?: string) =>
      checkRemoved(() =>
        dispatch(reducer.updateContent({ id, contentId, content, subContent }))
      ),
    [dispatch, checkRemoved, id, contentId]
  );

  // 컨텐트를 삭제한다. 이때 자동으로 롤백 데이터에 추가된다.
  const remove = useCallback(
    () =>
      checkRemoved(() => {
        !!content && rollback.captureContent(content);
        dispatch(reducer.removeContent({ id, contentId }));
      }),
    [dispatch, checkRemoved, id, contentId, content, rollback]
  );

  // Type Checking 이슈로 인해 따로 작성
  const getContent = () => {
    if (removed) {
      if (!!rollbackContent) {
        return rollbackContent;
      }

      if (!!rollbackIndex) {
        const content = rollbackIndex.contents.find(
          (content) => content.contentId === contentId
        );

        if (!content) {
          throw new Error();
        }

        return content;
      }
    }

    if (!content) {
      throw new Error();
    }

    return content;
  };

  return {
    content: getContent(),
    removed,
    update,
    remove,
  };
};

export {
  usePillDefaultEditor,
  usePillIndexEditor,
  usePillContentEditor,
  usePillOrder,
};
