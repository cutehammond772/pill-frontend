import * as React from "react";

import * as Style from "./default.style";
import Modal from "..";
import { CustomModalProps } from "../modal.type";

interface DefaultModalProps extends React.PropsWithChildren, CustomModalProps {
  excludeBackgroundPill?: boolean;
}

export const DefaultModal = (props: DefaultModalProps) => {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      layout={Style.Layout}
      transition={Style.Transition()}
      modalID={props.modalID}
    >
      {!props.excludeBackgroundPill && <Style.Pill />}
      <div className="container">{props.children}</div>
    </Modal>
  );
};
