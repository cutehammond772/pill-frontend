import * as Style from "../content.style";
import { IconButton, Chip } from "@mui/joy";
import { Tooltip } from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";

import { ImageContentLayout, ImageContentTitleLayout } from "./image.style";
import { usePillCreator } from "../../../../../../utils/hooks/pill_creator";

import * as React from "react";
import { useState } from "react";
import { AddContentButton } from "../add";
import { ImageContentModal } from "./modal";
import {
  IdProps,
  ContentProps,
} from "../../../../../../utils/reducers/pill/pill.type";
import { useRollback } from "../../../../../../utils/hooks/rollback";

// 이후 Modal은 별도로 빼놓아야 한다.
const AddImageButton = (props: IdProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AddContentButton
        icon={ImageIcon}
        title="이미지"
        description="인덱스 마지막에 이미지를 추가합니다."
        onClick={() => setOpen(true)}
      />

      <ImageContentModal
        open={open}
        onClose={() => setOpen(false)}
        access={{ ...props }}
      />
    </>
  );
};

const ImageContent = (props: ContentProps) => {
  const creator = usePillCreator();

  const rollback = useRollback();

  const rollbackedIndex = rollback.getIndex(props);
  const rollbackedContent = rollback.getContent(props);

  const index = rollbackedIndex || creator.getIndex(props);
  const data =
    rollbackedContent ||
    rollbackedIndex?.contents.find(
      (content) => content.contentId === props.contentId
    ) ||
    creator.getContent(props);
  const order =
    !!rollbackedIndex || !!rollbackedContent
      ? 0
      : creator.getContentOrder(props);

  // Edit Image
  const [open, setOpen] = useState<boolean>(false);

  const handleRemove = () => {
    rollback.captureContent(data);
    creator.withIndex(props).removeContent(props);
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
          {data.subContent}
        </Chip>

        <div className="buttons">
          {order !== 0 && (
            <Tooltip title="Up">
              <IconButton
                variant="outlined"
                color="primary"
                onClick={() => {
                  const prevContent = index.contents.at(order - 1);

                  if (!prevContent) {
                    throw new Error();
                  }

                  creator.withIndex(props).exchangeContent({
                    contentId: props.contentId,
                    exchangeId: prevContent.contentId,
                  });
                }}
                {...((!!rollbackedIndex || !!rollbackedContent) && {
                  disabled: true,
                })}
              >
                <KeyboardArrowUpIcon />
              </IconButton>
            </Tooltip>
          )}

          {order !== index.contents.length - 1 && (
            <Tooltip title="Down">
              <IconButton
                variant="outlined"
                color="primary"
                onClick={() => {
                  const nextContent = index.contents.at(order + 1);

                  if (!nextContent) {
                    throw new Error();
                  }

                  creator.withIndex(props).exchangeContent({
                    contentId: props.contentId,
                    exchangeId: nextContent.contentId,
                  });
                }}
                {...((!!rollbackedIndex || !!rollbackedContent) && {
                  disabled: true,
                })}
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
              {...((!!rollbackedIndex || !!rollbackedContent) && {
                disabled: true,
              })}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Remove">
            <IconButton
              variant="soft"
              color="danger"
              onClick={handleRemove}
              {...((!!rollbackedIndex || !!rollbackedContent) && {
                disabled: true,
              })}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Style.Title>
      <img src={data.content} alt={data.subContent} className="image" />

      <ImageContentModal
        open={open}
        onClose={() => setOpen(false)}
        access={props}
      />
    </Style.Container>
  );
};

export { ImageContent, AddImageButton };
