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
import { AddFunction } from "../../../../../../utils/reducers/pill/pill.type";
import { UpdateType } from "../../../../../../utils/hooks/pill_creator/pill_creator.type";
import { ContentProps } from "../content.type";

interface AddImageButtonProps {
  onAdd: AddFunction;
}

// 이후 Modal은 별도로 빼놓아야 한다.
const AddImageButton = React.forwardRef<HTMLButtonElement, AddImageButtonProps>(
  (props, ref) => {
    const [open, setOpen] = useState<boolean>(false);

    const { onAdd, ...refProps } = props;
    return (
      <>
        <AddContentButton
          icon={<ImageIcon />}
          title="Image"
          description="add an image into the pill."
          onClick={() => setOpen(true)}
          ref={ref}
          {...refProps}
        />

        <ImageContentModal
          open={open}
          onClose={() => setOpen(false)}
          onAdd={props.onAdd}
        />
      </>
    );
  }
);

const ImageContent = React.forwardRef<HTMLDivElement, ContentProps>(
  (props, ref) => {
    const creator = usePillCreator();
    const data =
      creator.data.indexes[props.access.index].contents[
        props.access.contentIndex
      ];

    // Edit Image
    const [open, setOpen] = useState<boolean>(false);

    const onUpdate: AddFunction = (data) => {
      creator.update(UpdateType.INDEX_CONTENT, {
        ...props.access,
        content: data.content,
        subContent: data.subContent,
      });
    };

    const { onRemove, onExchange, ...refProps } = props;

    return (
      <Style.Container
        layout={ImageContentLayout}
        ref={ref}
        {...refProps}
      >
        <Style.Title layout={ImageContentTitleLayout}>
          <div>
            <ImageIcon />
            <span>Image</span>
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

          <div>
            {props.access.contentIndex !== 0 && (
              <Tooltip title="Up">
                <IconButton
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    props.onExchange(
                      props.access.contentIndex,
                      props.access.contentIndex - 1
                    )
                  }
                >
                  <KeyboardArrowUpIcon />
                </IconButton>
              </Tooltip>
            )}

            {props.access.contentIndex !==
              creator.data.indexes[props.access.index].contents.length - 1 && (
              <Tooltip title="Down">
                <IconButton
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    props.onExchange(
                      props.access.contentIndex,
                      props.access.contentIndex + 1
                    )
                  }
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
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Remove">
              <IconButton
                variant="soft"
                color="danger"
                onClick={props.onRemove}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Style.Title>
        <img src={data.content} alt={data.subContent} />

        <ImageContentModal
          open={open}
          onClose={() => setOpen(false)}
          onAdd={onUpdate}
          editIndex={props.access}
        />
      </Style.Container>
    );
  }
);

export { ImageContent, AddImageButton };
