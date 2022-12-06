import * as React from "react";
import { useRef, useEffect, useState } from "react";

import * as Style from "./modal.style";
import { SerializedStyles } from "@emotion/react";

export interface ModalProps extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
  
  layout: SerializedStyles;
  dialogMode?: boolean;
  
  transition?: TransitionProps;
}

export const DEFAULT_DURATION = 500;

export const ModalTransitionType = {
  ENTERING: "Entering",
  ENTERED: "Entered",
  EXITING: "Exiting",
  EXITED: "Exited",
} as const;

export type ModalTransition =
typeof ModalTransitionType[keyof typeof ModalTransitionType];

export interface TransitionProps {
  transitions: { [type in ModalTransition]: SerializedStyles };
  durations: SerializedStyles;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const transitionID = useRef<NodeJS.Timeout>();
  const previousOpen = useRef<boolean>(props.open);
  const [transition, setTransition] = useState<ModalTransition>(
    ModalTransitionType.EXITED
  );

  useEffect(() => {
    if (previousOpen.current !== props.open) {
      previousOpen.current = props.open;

      setTransition(
        props.open ? ModalTransitionType.ENTERING : ModalTransitionType.EXITING
      );

      clearTimeout(transitionID.current);
      transitionID.current = setTimeout(() => {
        setTransition(
          props.open ? ModalTransitionType.ENTERED : ModalTransitionType.EXITED
        );
      }, DEFAULT_DURATION);
    }

    return () => clearTimeout(transitionID.current);
  }, [props.open]);

  return (
    <Style.Backdrop
      dialogMode={props.dialogMode}
      state={transition}
      onClick={props.onClose}
      duration={DEFAULT_DURATION}
    >
      <Style.Modal
        layout={props.layout}
        state={transition}
        ref={ref}
        onClick={(event) => event.stopPropagation()}
        customTransition={props.transition || Style.DefaultTransition()}
      >
        {props.children}
      </Style.Modal>
    </Style.Backdrop>
  );
});

export default Modal;
