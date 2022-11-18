import { Modal } from "../../../modal";
import * as Style from "./modal.style";

import WarningIcon from "@mui/icons-material/WarningAmber";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface ConfirmModalProps {
  open: boolean;
  
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal = (props: ConfirmModalProps) => {
  return (
    <Modal open={props.open} onClose={props.onClose} layout={Style.Layout}>
      <Style.InfoBanner>
        <WarningIcon className="icon" />
        <span className="title">경고</span>
      </Style.InfoBanner>
      <Style.Container>
        <span className="content">
          편집 창에서 벗어나면 지금까지 작성한 내용은 모두 사라집니다.
          계속하시겠습니까?
        </span>

        <Style.Button color="primary" startDecorator={<EditIcon />} onClick={props.onClose}>
          계속 편집하기
        </Style.Button>
        <Style.Button color="neutral" startDecorator={<ExitToAppIcon />} onClick={props.onConfirm}>
          벗어나기
        </Style.Button>
      </Style.Container>
    </Modal>
  );
};

export { ConfirmModal };
