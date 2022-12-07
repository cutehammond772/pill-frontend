import * as React from "react";
import { useState } from "react";
import { AddContentButton } from "../add";

import ImageValidator from "../../../../../../utils/validators/create/content/image";
import {
  usePillContentEditor,
} from "../../../../../../utils/hooks/editor";
import { IndexContentProps } from "../content.type";
import {
  useValidation,
  useValidator,
} from "../../../../../../utils/hooks/validation";
import { useI18n } from "../../../../../../utils/hooks/i18n";
import { I18N } from "../../../../../../utils/i18n";
import {
  DeleteButton,
  DownButton,
  EditButton,
  MenuButton,
  UpButton,
} from "../buttons";
import { useModal } from "../../../../../../utils/hooks/modal";
import { ModalTypes } from "../../../../../../layouts/modal/modal.type";

import * as Style from "../content.style";
import ImageIcon from "@mui/icons-material/Image";
import { ImageContentLayout, ImageContentTitleLayout } from "./image.style";

interface AddImageButtonProps {
  id: string;
}

export const AddImageButton = (props: AddImageButtonProps) => {
  const { text } = useI18n();
  const create = useModal(ModalTypes.ADD_IMAGE_CONTENT, { id: props.id });

  return (
    <AddContentButton
      icon={ImageIcon}
      title={text(I18N.PAGE_CREATE_11)}
      description={text(I18N.PAGE_CREATE_12)}
      onClick={create}
    />
  );
};

export const ImageContent = (props: IndexContentProps) => {
  const { text } = useI18n();
  const editor = usePillContentEditor(props.id, props.contentId);
  const validator = useValidator(ImageValidator(props.contentId, props.id));
  const create = useModal(ModalTypes.EDIT_IMAGE_CONTENT, {
    id: props.id,
    contentId: props.contentId,
  });

  const [open, setOpen] = useState<boolean>(false);

  const handleExchange = (relation: number) => {
    props.onExchange(relation);
  };

  const handleRemove = () => {
    editor.remove();
    validator.remove();
  };

  useValidation(validator.validate, {
    link: editor.content.content,
    description: editor.content.subContent,
  });

  return (
    <Style.Container layout={ImageContentLayout}>
      <Style.Title layout={ImageContentTitleLayout}>
        <div className="container">
          <ImageIcon className="icon" />
          <span className="title">{text(I18N.PAGE_CREATE_25)}</span>
          <div className="description">{editor.content.subContent}</div>
        </div>

        <Style.MenuButtons open={open}>
          <MenuButton
            open={open}
            onClick={() => setOpen(!open)}
            disabled={props.removed}
          />
          {props.order !== 0 && (
            <UpButton
              text={text}
              disabled={props.removed}
              onClick={() => handleExchange(-1)}
            />
          )}

          {!props.isEnd && (
            <DownButton
              text={text}
              disabled={props.removed}
              onClick={() => handleExchange(+1)}
            />
          )}

          <EditButton text={text} disabled={props.removed} onClick={create} />

          <DeleteButton
            text={text}
            disabled={props.removed}
            onClick={handleRemove}
          />
        </Style.MenuButtons>
      </Style.Title>

      <img
        src={editor.content.content}
        alt={editor.content.subContent}
        className="image"
      />
    </Style.Container>
  );
};
