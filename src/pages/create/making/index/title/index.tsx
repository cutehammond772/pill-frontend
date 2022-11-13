import { IconButton, TextField, Chip } from "@mui/joy";
import { Tooltip } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

import * as React from "react";
import { useState } from "react";

import { usePillCreator } from "../../../../../utils/hooks/pill_creator";
import { UpdateType } from "../../../../../utils/hooks/pill_creator/pill_creator.type";

import * as Style from "./title.style";

interface TitleProps {
  index: number;
  onRemove: () => void;
}

const Title = React.forwardRef<HTMLDivElement, TitleProps>((props, ref) => {
  const creator = usePillCreator();

  const [title, setTitle] = useState<string>(
    creator.data.indexes[props.index].title
  );
  const [edit, setEdit] = useState<boolean>(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length <= 40) {
      setTitle(value);
    }
  };

  const closeEdit = () => {
    setEdit(false);
    creator.update(UpdateType.INDEX_TITLE, {
      index: props.index,
      title: title,
    });
  };

  const { onRemove, ...refProps } = props;

  return (
    <Style.Title ref={ref} {...refProps}>
      <span>#{props.index + 1}</span>
      {!edit ? (
        <Style.TitleEditButton
          color="neutral"
          variant="plain"
          onClick={() => setEdit(true)}
          endDecorator={
            <Chip size="sm" color="neutral" variant="solid">
              Click to Edit
            </Chip>
          }
        >
          {!title ? "Untitled" : title}
        </Style.TitleEditButton>
      ) : (
        <>
          <TextField
            placeholder="~40 characters"
            fullWidth
            // only way to bring text
            onChange={handleTitle}
            onBlur={closeEdit}
            value={title || ""}
          />

          <Tooltip title="Done">
            <IconButton variant="solid" color="success" onClick={closeEdit}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
        </>
      )}

      <Tooltip title="Remove">
        <IconButton variant="soft" color="danger" onClick={props.onRemove}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Style.Title>
  );
});

export { Title };
