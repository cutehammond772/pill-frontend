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
import { useState, useEffect, useCallback } from "react";
import { AddContentButton } from "../add";
import { ImageContentModal } from "./modal";

import * as Content from "../../../../../../utils/validators/create/content";
import { PillContentType } from "../../../../../../utils/reducers/pill/pill.type";
import {
  usePillContentEditor,
  usePillIndexEditor,
} from "../../../../../../utils/hooks/pill_creator";
import { IndexContentProps } from "../content.type";
import { useValidation } from "../../../../../../utils/hooks/validation";

interface AddImageButtonProps {
  id: string;
}

const MemoizedAddImageButton = React.memo((props: { onClick: () => void }) => (
  <AddContentButton
    icon={ImageIcon}
    title="이미지"
    description="인덱스 마지막에 이미지를 추가합니다."
    onClick={props.onClick}
  />
));

const AddImageButton = (props: AddImageButtonProps) => {
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
      <MemoizedAddImageButton onClick={handleOpen} />
      <ImageContentModal
        open={open}
        onClose={() => setOpen(false)}
        onAdd={handleAddImage}
      />
    </>
  );
};

const ImageContent = (props: IndexContentProps) => {
  const editor = usePillContentEditor(props.id, props.contentId);
  const validator = useValidation(Content.Validator(props.contentId, props.id));

  const [open, setOpen] = useState<boolean>(false);

  const handleUpdateImage = (link: string, description: string) => {
    editor.update(link, description);
    validator.needValidate();
  };

  const handleExchange = (relation: number) => {
    props.onExchange(relation);
    validator.needValidate();
  };

  useEffect(() => {
    validator.validate({
      type: PillContentType.IMAGE,
      content: editor.content.content,
      subContent: editor.content.subContent,
    });
  }, [validator, editor.content]);

  const handleRemove = () => {
    editor.remove();
    validator.remove();
  };

  return (
    <Style.Container layout={ImageContentLayout}>
      <Style.Title layout={ImageContentTitleLayout}>
        <div className="container">
          <ImageIcon className="icon" />
          <span className="title">이미지</span>
        </div>

        <Chip
          size="md"
          color="primary"
          variant="soft"
          sx={{
            userSelect: "none",
          }}
        >
          {editor.content.content}
        </Chip>

        <div className="buttons">
          {props.order !== 0 && (
            <Tooltip title="Up">
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
            <Tooltip title="Down">
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

          <Tooltip title="Edit">
            <IconButton
              variant="solid"
              color="info"
              onClick={() => setOpen(true)}
              disabled={props.removed}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Remove">
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

export { ImageContent, AddImageButton };
