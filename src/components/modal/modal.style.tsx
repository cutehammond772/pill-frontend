import styled from "@emotion/styled";
import { SerializedStyles } from "@emotion/serialize";

import { IconButton } from "@mui/joy";
import { ModalTransition, ModalTransitionType } from ".";

const Backdrop = styled.div<{
  dialogMode?: boolean;
  duration: number;
  state: ModalTransition;
}>`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  transition: ${(props) => `backdrop-filter ${ props.duration }ms`};

  z-index: var(--z-modal);

  backdrop-filter: ${(props) => {
    switch (props.state) {
      case ModalTransitionType.ENTERING:
      case ModalTransitionType.ENTERED:
        return !props.dialogMode ? "blur(8px)" : "none";

      case ModalTransitionType.EXITING:
      case ModalTransitionType.EXITED:
        return "none";
    }
  }};

  visibility: ${(props) =>
    props.state === ModalTransitionType.EXITED ? "hidden" : "visible"};
`;

const Modal = styled.div<{
  duration: number;
  layout: SerializedStyles;
  state: ModalTransition;
}>`
  ${(props) => props.layout};

  opacity: ${(props) => {
    switch (props.state) {
      case ModalTransitionType.ENTERING:
      case ModalTransitionType.ENTERED:
        return "1";

      case ModalTransitionType.EXITING:
      case ModalTransitionType.EXITED:
        return "0";
    }
  }};

  transition: ${(props) => `opacity ${ props.duration }ms`};
  
  visibility: ${(props) =>
    props.state === ModalTransitionType.EXITED ? "hidden" : "visible"};
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 15px;
  right: 15px;
`;

export { CloseButton, Backdrop, Modal };
