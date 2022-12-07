import * as React from "react";
import { useRef, useEffect, useState, useCallback } from "react";
import { SerializedStyles } from "@emotion/react";

import * as Style from "./modal.style";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomModalProps,
  DEFAULT_DURATION,
  ModalMapper,
  ModalTransition,
  ModalTransitions,
  TransitionProps,
} from "./modal.type";

import {
  StaticSelectors as selectors,
  Actions as actions,
  InternalActions as internal,
} from "../../utils/reducers/modal";

export const GlobalModalProvider = (props: React.PropsWithChildren) => {
  const dispatch = useDispatch();
  const info = useSelector(selectors.INFOS);
  const mapper = ModalMapper();

  const handleClose = useCallback(
    (modalID: string) => dispatch(actions.removeModal({ modalID })),
    [dispatch]
  );

  return (
    <Style.Container>
      {props.children}
      {Object.keys(info).map((modalID) => {
        const { type, open } = info[modalID];
        const Modal = mapper[type];

        return (
          <Modal
            open={open}
            modalID={modalID}
            onClose={() => handleClose(modalID)}
            key={modalID}
          />
        );
      })}
    </Style.Container>
  );
};

export interface ModalProps extends React.PropsWithChildren, CustomModalProps {
  // 이 모달의 레이아웃이다.
  layout: SerializedStyles;

  // 모달 뒤에 있는 백그라운드 블러 처리를 하지 않는다.
  // 단, 다른 모달에 backdrop이 존재하는 이상 이 설정은 적용되지 않는다.
  noBackdrop?: boolean;

  // 모달과 모달 뒤의 백그라운드가 공존할 수 있도록 한다.
  // 기본적으로 'noBackdrop' 처리된다.
  dialog?: boolean;

  // 모달의 Transition을 커스텀할 수 있다.
  transition?: TransitionProps;

  // 모달의 Transition 지속 시간을 설정한다. 기본값은 500(ms)이다.
  duration?: number;
}

const Modal = (props: ModalProps) => {
  const dispatch = useDispatch();

  const transitionID = useRef<NodeJS.Timeout>();
  const [transition, setTransition] = useState<ModalTransition>(
    ModalTransitions.EXITED
  );

  useEffect(() => {
    setTransition(
      props.open ? ModalTransitions.ENTERING : ModalTransitions.EXITING
    );

    clearTimeout(transitionID.current);

    transitionID.current = setTimeout(() => {
      setTransition(
        props.open ? ModalTransitions.ENTERED : ModalTransitions.EXITED
      );

      if (!props.open) {
        dispatch(internal.responseEnd({ modalID: props.modalID }));
      }
    }, props.duration || DEFAULT_DURATION);

    return () => clearTimeout(transitionID.current);
  }, [dispatch, props, props.open]);

  const modalComponent = (
    <Style.Modal
      layout={props.layout}
      state={transition}
      onClick={(event) => event.stopPropagation()}
      customTransition={props.transition || Style.DefaultTransition()}
    >
      {props.children}
    </Style.Modal>
  );

  return !!props.dialog ? (
    modalComponent
  ) : (
    <Style.Backdrop
      noBackdrop={!!props.noBackdrop}
      state={transition}
      onClick={props.onClose}
      duration={props.duration || DEFAULT_DURATION}
    >
      {modalComponent}
    </Style.Backdrop>
  );
};

export default Modal;
