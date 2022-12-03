import * as React from "react";
import { useRef } from "react";

import * as Style from "./default.style";
import Modal from "../../modal";

interface DefaultModalProps extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export const DefaultModal = (props: DefaultModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  return (
    <Modal
      onClose={props.onClose}
      open={props.open}
      layout={Style.Layout}
      ref={modalRef}
    >
      <Style.Pill />
      <div className="container">{props.children}</div>
    </Modal>
  );
};
