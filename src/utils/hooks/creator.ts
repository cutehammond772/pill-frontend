import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";

import { Actions as actions } from "../reducers/creator";
import { PillContent } from "../pill/pill.type";

// 현재 편집 가능한 여부를 확인한다.
export const useEditorAvailable = () => {
  const dispatch = useDispatch();
  const available = useSelector((state: RootState) => state.creator.available);

  const check = <T>(callbackFn: T) => {
    if (!available) {
      throw new Error(
        "[useEditorAvailable] 현재 편집 모드가 비활성화 상태입니다."
      );
    }

    return callbackFn;
  };

  // 편집 모드를 종료한다.
  // => 이때 편집 창이 완전히 다른 페이지로 넘어간 뒤에 편집 데이터가 초기화된다.
  const finishEditor = useCallback(() => {
    if (!available) {
      throw new Error(
        "[useEditorAvailable] 편집 모드가 활성화된 상태에서 비활성화할 수 있습니다."
      );
    }

    dispatch(actions.finish());
  }, [dispatch, available]);

  // 편집 모드를 시작한다.
  const beginEditor = useCallback(() => {
    if (!available) {
      throw new Error(
        "[useEditorAvailable] 편집 모드가 비활성화된 상태에서 활성화할 수 있습니다."
      );
    }

    dispatch(actions.begin());
  }, [dispatch, available]);

  return { available, check, finishEditor, beginEditor, dispatch: check(dispatch) };
};

export const useEditorIndex = (id: string) => {
  const rollbackIndex = useSelector((state: RootState) =>
    state.rollback.indexes.find((index) => index.id === id)
  );
  const index = useSelector((state: RootState) =>
    state.creator.indexes.find((index) => index.id === id)
  );

  // 인덱스를 수정하기 전 삭제된 인덱스인지 확인한다.
  const modify = useCallback(<T>(callbackFn: T, removed: boolean) => {
    if (removed) {
      throw new Error(
        "[useEditorIndex] 삭제된 인덱스에 대해 수정을 시도하였습니다."
      );
    }

    return callbackFn;
  }, []);

  if (!!rollbackIndex) {
    return {
      index: rollbackIndex,
      removed: true,
      modify: <T>(callbackFn: T) => modify(callbackFn, true),
    };
  }

  if (!!index) {
    return {
      index: index,
      removed: false,
      modify: <T>(callbackFn: T) => modify(callbackFn, false),
    };
  }

  throw new Error("[useEditorIndex] 존재하지 않는 인덱스 ID를 참조했습니다.");
};

export const useEditorContent = (id: string, contentId: string) => {
  const { index, removed } = useEditorIndex(id);
  const rollbackContent = useSelector((state: RootState) =>
    state.rollback.contents.find((content) => content.contentId === contentId)
  );

  // 컨텐츠를 수정하기 전 삭제된 컨텐츠인지 확인한다.
  const modify = useCallback(<T>(callbackFn: T, removed: boolean) => {
    if (removed) {
      throw new Error(
        "[useEditorContent] 삭제된 컨텐츠에 대해 수정을 시도하였습니다."
      );
    }

    return callbackFn;
  }, []);

  if (!!rollbackContent) {
    return {
      content: rollbackContent,
      removed: true,
      modify: <T>(callbackFn: T) => modify(callbackFn, true),
    };
  }

  const content = index.contents.find(
    (content) => content.contentId === contentId
  );

  if (!!content) {
    return {
      content: content,
      removed: removed,
      modify: <T>(callbackFn: T) => modify(callbackFn, removed),
    };
  }

  throw new Error("[useEditorContent] 존재하지 않는 컨텐츠 ID를 참조했습니다.");
};

// 기본 설정을 담당한다.
// (ex. Pill 제목, 카테고리, 새 인덱스 추가, 편집 활성화 등)
export const usePillDefaultEditor = () => {
  const { available, beginEditor, finishEditor, dispatch } = useEditorAvailable();

  const title = useSelector((state: RootState) => state.creator.title);
  const categories = useSelector(
    (state: RootState) => state.creator.categories
  );

  // 인덱스를 추가한다.
  const addIndex = useCallback(
    () => dispatch(actions.createIndex()),
    [dispatch]
  );

  // 새로운 카테고리를 추가한다.
  const addCategory = useCallback(
    (category: string) => {
      if (categories.find((c) => c.category === category)) {
        throw new Error("[useDefaultEditor] 해당 카테고리가 이미 존재합니다.");
      }

      dispatch(actions.addCategory({ category }));
    },
    [categories, dispatch]
  );

  // 카테고리를 삭제한다.
  const removeCategory = useCallback(
    (categoryId: string) => {
      if (!categories.find((c) => c.categoryId === categoryId)) {
        throw new Error(
          "[useDefaultEditor] 삭제 대상인 카테고리가 존재하지 않습니다."
        );
      }

      dispatch(actions.removeCategory({ categoryId }));
    },
    [categories, dispatch]
  );

  // 제목을 갱신한다.
  const updateTitle = useCallback(
    (title: string) => {
      dispatch(actions.updateTitle({ title }));
    },
    [dispatch]
  );

  // 카테고리를 초기화한다.
  const resetCategories = useCallback(
    () => dispatch(actions.resetCategories()),
    [dispatch]
  );

  return {
    title,
    categories,
    available,
    
    addCategory,
    removeCategory,
    resetCategories,

    addIndex,
    updateTitle,

    beginEditor,
    finishEditor,
  };
};

// 인덱스 또는 카테고리의 순서(=위치)를 구하는 데 사용한다.
export const usePillOrder = () => {
  const indexes = useSelector((state: RootState) => state.creator.indexes);

  // id를 가진 인덱스의 순서를 구한다.
  const index = useCallback(
    (id: string) => {
      const order = indexes.findIndex((index) => index.id === id);

      if (order === -1) {
        throw new Error("[usePillOrder] 존재하지 않는 인덱스 ID입니다.");
      }

      return order;
    },
    [indexes]
  );

  // contentId를 가진 컨텐트의 순서를 구한다.
  const content = useCallback(
    (id: string, contentId: string) => {
      const index = indexes.find((index) => index.id === id);

      if (!index) {
        throw new Error("[usePillOrder] 존재하지 않는 인덱스 ID입니다.");
      }

      const order = index.contents.findIndex(
        (content) => content.contentId === contentId
      );

      if (order === -1) {
        throw new Error("[usePillOrder] 존재하지 않는 컨텐츠 ID입니다.");
      }

      return order;
    },
    [indexes]
  );

  return { index, content };
};

// 인덱스를 수정하는 데 사용한다.
export const usePillIndexEditor = (id: string) => {
  const { dispatch } = useEditorAvailable();
  const { index, removed, modify } = useEditorIndex(id);

  // 새로운 컨텐츠를 추가한다.
  const addContent = useCallback(
    (contentType: PillContent, content: string, subContent?: string) =>
      modify(dispatch)(
        actions.addContent({ id, contentType, content, subContent })
      ),
    [dispatch, id, modify]
  );

  // 동일한 인덱스 내의 컨텐츠 위치를 바꾼다.
  const exchangeContent = useCallback(
    (contentId: string, exchangeId: string) =>
      modify(dispatch)(actions.exchangeContent({ id, contentId, exchangeId })),
    [dispatch, modify, id]
  );

  // 인덱스의 제목을 갱신한다.
  const updateTitle = useCallback(
    (title: string) =>
      modify(dispatch)(actions.updateIndexTitle({ id, title })),
    [dispatch, modify, id]
  );

  // 인덱스를 삭제한다. 이때 자동으로 롤백 데이터에 추가된다.
  const remove = useCallback(
    () => modify(dispatch)(actions.removeIndex({ id })),
    [dispatch, id, modify]
  );

  return {
    index,
    removed,
    addContent,
    exchangeContent,
    updateTitle,
    remove,
  };
};

// 컨텐츠를 수정하는 데 사용한다.
export const usePillContentEditor = (id: string, contentId: string) => {
  const { dispatch } = useEditorAvailable();
  const { content, removed, modify } = useEditorContent(id, contentId);

  // 컨텐츠 내용을 갱신한다.
  const update = useCallback(
    (content: string, subContent?: string) =>
      modify(dispatch)(
        actions.updateContent({ id, contentId, content, subContent })
      ),
    [dispatch, id, contentId, modify]
  );

  // 컨텐츠를 삭제한다. 이때 자동으로 롤백 데이터에 추가된다.
  const remove = useCallback(
    () => modify(dispatch)(actions.removeContent({ id, contentId })),
    [dispatch, id, contentId, modify]
  );

  return {
    content,
    removed,
    update,
    remove,
  };
};
