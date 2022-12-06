import { useCallback } from "react";
import { useI18n } from "../../../../utils/hooks/i18n";
import { I18N } from "../../../../utils/i18n";
import { DefaultModal } from "../../../../layouts/modal/default";

import * as Style from "./confirm.style";
import WarningIcon from "@mui/icons-material/WarningAmber";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { CustomModalProps } from "../../../../layouts/modal/modal.type";
import { usePageNavigate } from "../../../../utils/hooks/page-navigate";
import { usePillDefaultEditor } from "../../../../utils/hooks/editor";

export const ConfirmModal = (props: CustomModalProps) => {
  const { text } = useI18n();
  const { navigate } = usePageNavigate();
  const editor = usePillDefaultEditor();

  const handleConfirm = useCallback(() => {
    editor.finishEditor();

    // 뒤로가기를 통해 다시 되돌아가지 않도록 한다.
    navigate("/", true);
    props.onClose();
  }, [editor, navigate, props]);

  return (
    <DefaultModal
      open={props.open}
      onClose={props.onClose}
      modalID={props.modalID}
      excludeBackgroundPill
    >
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
          onClick={handleConfirm}
        >
          {text(I18N.HEADER_CREATE_08)}
        </Style.Button>
      </Style.Container>
    </DefaultModal>
  );
};
