import {
  ContentContainerStyle,
  ContentContainerTitleStyle,
} from "../content.style";
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
  AddFunction,
  PillContentRequest,
} from "../../../../../../utils/reducers/pill/pill.type";
import { UpdateType } from "../../../../../../utils/hooks/pill_creator/pill_creator.type";

const AddImageButton = ({ onAdd }: { onAdd: AddFunction }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AddContentButton
        icon={<ImageIcon />}
        title="Image"
        description="add an image into the pill."
        onClick={() => setOpen(true)}
      />

      <ImageContentModal
        open={open}
        onClose={() => setOpen(false)}
        onAdd={onAdd}
      />
    </>
  );
};

const ImageContent = ({
  onRemove,
  access,
}: React.PropsWithChildren<{
  onRemove: () => void;
  access: { index: number; contentIndex: number };
}>) => {
  const creator = usePillCreator();
  const data = creator.data.indexes[access.index].contents[access.contentIndex];

  // Edit Image
  const [open, setOpen] = useState<boolean>(false);

  const onUpdate: AddFunction = (data) => {
    creator.update(UpdateType.INDEX_CONTENT, {
      ...access,
      content: data.content,
      subContent: data.subContent,
    });
  };

  return (
    <ContentContainerStyle layout={ImageContentLayout}>
      <ContentContainerTitleStyle layout={ImageContentTitleLayout}>
        <div>
          <ImageIcon />
          <span>Image</span>
        </div>

        <Chip
          size="lg"
          color="info"
          sx={{
            userSelect: "none",
            textTransform: "uppercase",
            fontFamily: "Inter",
          }}
        >
          {data.subContent}
        </Chip>

        <div>
          {access.contentIndex !== 0 && (
            <Tooltip title="Up">
              <IconButton variant="soft" color="primary">
                <KeyboardArrowUpIcon />
              </IconButton>
            </Tooltip>
          )}

          {access.contentIndex !==
            creator.data.indexes[access.index].contents.length - 1 && (
            <Tooltip title="Down">
              <IconButton variant="soft" color="primary">
                <KeyboardArrowDownIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Edit">
            <IconButton
              variant="soft"
              color="info"
              onClick={() => setOpen(true)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Remove">
            <IconButton variant="soft" color="danger" onClick={onRemove}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </ContentContainerTitleStyle>
      <img src={data.content} alt={data.subContent} />

      <ImageContentModal
        open={open}
        onClose={() => setOpen(false)}
        onAdd={onUpdate}
        editIndex={access}
      />
    </ContentContainerStyle>
  );
};

export { ImageContent, AddImageButton };
