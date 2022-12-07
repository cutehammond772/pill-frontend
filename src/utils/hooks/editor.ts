import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Actions as actions,
  StaticSelectors as selectors,
  DynamicSelectors as dynamic,
} from "../reducers/editor";
import { DynamicSelectors as rollbackDynamic } from "../reducers/rollback";

import { PillContent } from "../pill/pill.type";
import { AnyAction } from "redux";
import { useParamSelector } from "./param-selector";

// 편집 모드의 활성화 여부를 확인한다.
export const useEditorAvailable = () => {
  const dispatch = useDispatch();
  const available = useSelector(selectors.AVAILABLE);

  const check = <T>(callbackFn: T) => {
    if (!available) {
      throw new Error(
        "[useEditorAvailable] 현재 편집 모드가 비활성화 상태입니다."
      );
    }

    return callbackFn;
  };

  // 편집 모드를 비활성화한다.
  // => 이때 편집 페이지에서 다른 페이지로 이동한 뒤에 편집 데이터가 초기화된다.
  // => 다른 페이지로 이동하기 전에 호출해야 한다.
  const finishEditor = useCallback(() => {
    if (!available) {
      throw new Error(
        "[useEditorAvailable] 편집 모드가 비활성화된 상태에서 비활성화를 시도했습니다."
      );
    }

    dispatch(actions.finish());
  }, [dispatch, available]);

  // 편집 모드를 활성화한다.
  // => 실질적으로 편집 페이지로 이동(transition)이 완전히 완료되어야 활성화된다.
  const beginEditor = useCallback(() => {
    if (available) {
      throw new Error(
        "[useEditorAvailable] 편집 모드가 이미 활성화된 상태에서 활성화를 시도했습니다."
      );
    }

    dispatch(actions.begin());
  }, [dispatch, available]);

  return {
    available,
    check,
    finishEditor,
    beginEditor,
    dispatch: (argument: AnyAction) => check(dispatch(argument)),
  };
};

export const useEditorIndex = (id: string) => {
  const rollbackIndex = useParamSelector(rollbackDynamic.INDEX, id);
  const index = useParamSelector(dynamic.INDEX, id);

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
  const rollbackContent = useParamSelector(rollbackDynamic.CONTENT, contentId);

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
  const { available, beginEditor, finishEditor, dispatch } =
    useEditorAvailable();

  const title = useSelector(selectors.PILL_TITLE);
  const categories = useSelector(selectors.CATEGORIES);

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
  const indexes = useSelector(selectors.INDEXES);

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
