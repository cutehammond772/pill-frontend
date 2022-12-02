import * as Style from "../content.style";
import { IconButton, Chip } from "@mui/joy";
import { Tooltip } from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";

import { ImageContentLayout, ImageContentTitleLayout } from "./image.style";

import * as React from "react";
import { useState, useCallback } from "react";
import { AddContentButton } from "../add";
import ImageContentModal from "./modal";

import ImageValidator from "../../../../../../utils/validators/create/content/image";
import { PillContentType } from "../../../../../../utils/pill/pill.type";
import {
  usePillContentEditor,
  usePillIndexEditor,
} from "../../../../../../utils/hooks/editor";
import { IndexContentProps } from "../content.type";
import { useValidation } from "../../../../../../utils/hooks/validation";
import { useI18n } from "../../../../../../utils/hooks/i18n";
import { I18N } from "../../../../../../utils/i18n";

interface AddImageButtonProps {
  id: string;
}

export const AddImageButton = (props: AddImageButtonProps) => {
  const { text } = useI18n();
  const editor = usePillIndexEditor(props.id);

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);

  const handleAddImage = useCallback(
    (link: string, description: string) => {
      editor.addContent(PillContentType.IMAGE, link, description);
    },
    [editor]
  );

  return (
    <>
      <AddContentButton
        icon={ImageIcon}
        title={text(I18N.PAGE_CREATE_11)}
        description={text(I18N.PAGE_CREATE_12)}
        onClick={handleOpen}
      />
      <ImageContentModal
        open={open}
        onClose={() => setOpen(false)}
        onAdd={handleAddImage}
      />
    </>
  );
};

export const ImageContent = (props: IndexContentProps) => {
  const { text } = useI18n();
  const editor = usePillContentEditor(props.id, props.contentId);
  const validator = useValidation(ImageValidator(props.contentId, props.id));

  const [open, setOpen] = useState<boolean>(false);

  const handleUpdateImage = (link: string, description: string) => {
    editor.update(link, description);
    validator.validate({ link, description });
  };

  const handleExchange = (relation: number) => {
    props.onExchange(relation);
    
    // 수정*
    validator.validate({
      link: editor.content.content,
      description: editor.content.subContent,
    });
  };

  const handleRemove = () => {
    editor.remove();
    validator.remove();
  };

  return (
    <Style.Container layout={ImageContentLayout}>
      <Style.Title layout={ImageContentTitleLayout}>
        <div className="container">
          <ImageIcon className="icon" />
          <span className="title">{text(I18N.PAGE_CREATE_25)}</span>
        </div>

        <Chip
          size="md"
          color="primary"
          variant="soft"
          sx={{
            userSelect: "none",
          }}
        >
          {editor.content.subContent}
        </Chip>

        <div className="buttons">
          {props.order !== 0 && (
            <Tooltip title={text(I18N.PAGE_CREATE_27)}>
              <IconButton
                variant="outlined"
                color="primary"
                onClick={() => handleExchange(-1)}
                disabled={props.removed}
              >
                <KeyboardArrowUpIcon />
              </IconButton>
            </Tooltip>
          )}

          {!props.isEnd && (
            <Tooltip title={text(I18N.PAGE_CREATE_28)}>
              <IconButton
                variant="outlined"
                color="primary"
                onClick={() => handleExchange(+1)}
                disabled={props.removed}
              >
                <KeyboardArrowDownIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title={text(I18N.PAGE_CREATE_29)}>
            <IconButton
              variant="solid"
              color="info"
              onClick={() => setOpen(true)}
              disabled={props.removed}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={text(I18N.PAGE_CREATE_30)}>
            <IconButton
              variant="soft"
              color="danger"
              onClick={handleRemove}
              disabled={props.removed}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Style.Title>
      <img
        src={editor.content.content}
        alt={editor.content.subContent}
        className="image"
      />

      {!props.removed && (
        <ImageContentModal
          open={open}
          edit={{
            link: editor.content.content,
            description: editor.content.subContent,
          }}
          onUpdate={handleUpdateImage}
          onClose={() => setOpen(false)}
        />
      )}
    </Style.Container>
  );
};
