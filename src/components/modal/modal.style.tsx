/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";

import styled from "@emotion/styled";
import { SerializedStyles } from "@emotion/react";

import { ModalTransition, ModalTransitionType, TransitionProps } from ".";

export const Backdrop = styled.div<{
  dialogMode?: boolean;
  duration: number;
  state: ModalTransition;
}>`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  transition: ${(props) => `backdrop-filter ${props.duration}ms`};
  z-index: var(--z-modal);

  backdrop-filter: ${(props) => {
    switch (props.state) {
      case ModalTransitionType.ENTERING:
      case ModalTransitionType.ENTERED:
        return !props.dialogMode ? "blur(4px)" : "none";

      case ModalTransitionType.EXITING:
      case ModalTransitionType.EXITED:
        return "none";
    }
  }};

  visibility: ${(props) =>
    props.state === ModalTransitionType.EXITED ? "hidden" : "visible"};
`;

export const Modal = styled.div<{
  layout: SerializedStyles;
  state: ModalTransition;
  customTransition: TransitionProps;
}>`
  ${(props) => props.layout};

  ${(props) => props.customTransition.transitions[props.state]};
  ${(props) => props.customTransition.durations};

  visibility: ${(props) =>
    props.state === ModalTransitionType.EXITED ? "hidden" : "visible"};
`;

export const DefaultTransition = (): TransitionProps => ({
  transitions: {
    [ModalTransitionType.ENTERING]: css`
      opacity: 1;
    `,
    [ModalTransitionType.ENTERED]: css`
      opacity: 1;
    `,
    [ModalTransitionType.EXITING]: css`
      opacity: 0;
    `,
    [ModalTransitionType.EXITED]: css`
      opacity: 0;
    `,
  },
  durations: css`
    transition: opacity 300ms;
  `,
});
