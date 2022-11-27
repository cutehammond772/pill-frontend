import { Modal } from "../../../modal";
import * as Style from "./modal.style";

import WarningIcon from "@mui/icons-material/WarningAmber";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useLocalization } from "../../../../utils/hooks/l10n";
import { L10N } from "../../../../localization";

interface ConfirmModalProps {
  open: boolean;

  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const { text } = useLocalization();

  return (
    <Modal open={props.open} onClose={props.onClose} layout={Style.Layout}>
      <Style.InfoBanner>
        <WarningIcon className="icon" />
        <span className="title">{text(L10N.HEADER_CREATE_06)}</span>
      </Style.InfoBanner>
      <Style.Container>
        <span className="content">{text(L10N.HEADER_CREATE_07)}</span>

        <Style.Button
          color="primary"
          startDecorator={<EditIcon />}
          onClick={props.onClose}
        >
          {text(L10N.HEADER_CREATE_09)}
        </Style.Button>
        <Style.Button
          color="neutral"
          startDecorator={<ExitToAppIcon />}
          onClick={props.onConfirm}
        >
          {text(L10N.HEADER_CREATE_08)}
        </Style.Button>
      </Style.Container>
    </Modal>
  );
};

export { ConfirmModal };
