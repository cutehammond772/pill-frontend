import * as React from "react";
import { useRef } from "react";

import * as Style from "./default.style";
import Modal, { TransitionProps } from "../../modal";

interface DefaultModalProps extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;

  transition?: TransitionProps;
  excludeBackgroundPill?: boolean;
}

export const DefaultModal = (props: DefaultModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  return (
    <Modal
      onClose={props.onClose}
      open={props.open}
      layout={Style.Layout}
      ref={modalRef}
      transition={props.transition || Style.Transition()}
    >
      {!props.excludeBackgroundPill && <Style.Pill />}
      <div className="container">{props.children}</div>
    </Modal>
  );
};
