import { useCallback } from "react";

import { useDispatch } from "react-redux";
import { ModalType } from "../../layouts/modal/modal.type";
import { Actions as actions, AnyProps } from "../reducers/modal";

// 모달 생성을 담당하는 Hook이다.
export const useModal = (type: ModalType, props: AnyProps) => {
  const dispatch = useDispatch();

  // 모달을 생성한다. 이 Hook에서 모달의 관리는 불가능하다.
  const create = useCallback(() => {
    dispatch(actions.createModal({ type, props }));
  }, [dispatch, props, type]);

  return create;
};
