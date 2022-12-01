import Modal from "../../../modal";
import * as Style from "./modal.style";

import WarningIcon from "@mui/icons-material/WarningAmber";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useI18n } from "../../../../utils/hooks/i18n";
import { I18N } from "../../../../utils/i18n";

export interface ConfirmModalProps {
  open: boolean;

  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmModal = (props: ConfirmModalProps) => {
  const { text } = useI18n();

  return (
    <Modal open={props.open} onClose={props.onClose} layout={Style.Layout}>
      <Style.InfoBanner>
        <WarningIcon className="icon" />
        <span className="title">{text(I18N.HEADER_CREATE_06)}</span>
      </Style.InfoBanner>

      <Style.Container>
        <span className="content">{text(I18N.HEADER_CREATE_07)}</span>

        <Style.Button
          color="primary"
          startDecorator={<EditIcon />}
          onClick={props.onClose}
        >
          {text(I18N.HEADER_CREATE_09)}
        </Style.Button>
        <Style.Button
          color="neutral"
          startDecorator={<ExitToAppIcon />}
          onClick={props.onConfirm}
        >
          {text(I18N.HEADER_CREATE_08)}
        </Style.Button>
      </Style.Container>
    </Modal>
  );
};
