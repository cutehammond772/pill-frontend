import * as React from "react";
import { useRef, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import * as Style from "./modal.style";
import { SerializedStyles } from "@emotion/serialize";

interface ModalProps extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;

  layout: SerializedStyles;

  closeButton?: boolean;
  dialogMode?: boolean;
  duration?: number;
}

const DEFAULT_DURATION: number = 300;

const ModalTransitionType = {
  ENTERING: "Entering",
  ENTERED: "Entered",
  EXITING: "Exiting",
  EXITED: "Exited",
} as const;

type ModalTransition =
  typeof ModalTransitionType[keyof typeof ModalTransitionType];

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
      }, 300);
    }

    return () => clearTimeout(transitionID.current);
  }, [props.open]);

  return (
    <Style.Backdrop
      dialogMode={props.dialogMode}
      state={transition}
      onClick={props.onClose}
      duration={props.duration || DEFAULT_DURATION}
    >
      <Style.Modal
        layout={props.layout}
        state={transition}
        ref={ref}
        onClick={(event) => event.stopPropagation()}
        duration={props.duration || DEFAULT_DURATION}
      >
        {props.children}
        {!!props?.closeButton && (
          <Style.CloseButton
            size="sm"
            color="neutral"
            variant="plain"
            onClick={props.onClose}
          >
            <CloseIcon />
          </Style.CloseButton>
        )}
      </Style.Modal>
    </Style.Backdrop>
  );
});

export {
  Modal,
  type ModalProps,
  type ModalTransition,
  DEFAULT_DURATION,
  ModalTransitionType,
};
