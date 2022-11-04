import { IconButton, TextField, Chip } from "@mui/joy";
import { Tooltip } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

import * as React from "react";
import { useState } from "react";

import { usePillCreator } from "../../../../../utils/hooks/pill_creator";
import { UpdateType } from "../../../../../utils/hooks/pill_creator/pill_creator.type";

import { TitleStyle, TitleEditButtonStyle } from "./title.style";

const Title = ({
  index,
  onRemove,
}: {
  index: number;
  onRemove: () => void;
}) => {
  const creator = usePillCreator();

  const [title, setTitle] = useState<string>(creator.data.indexes[index].title);
  const [edit, setEdit] = useState<boolean>(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  const closeEdit = () => {
    setEdit(false);
    creator.update(UpdateType.INDEX_TITLE, { index: index, title: title });
  };

  return (
    <TitleStyle>
      <span>#{index + 1}</span>
      {!edit ? (
        <TitleEditButtonStyle
          color="info"
          variant="plain"
          onClick={() => setEdit(true)}
          endDecorator={
            <Chip size="sm" color="info">
              Click to Edit
            </Chip>
          }
        >
          {!title ? "Untitled" : title}
        </TitleEditButtonStyle>
      ) : (
        <>
          <TextField
            placeholder="type in here...."
            fullWidth
            // only way to bring text
            onChange={handleTitle}
            onBlur={closeEdit}
            defaultValue={title}
          />

          <Tooltip title="Done">
            <IconButton variant="soft" color="success" onClick={closeEdit}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
        </>
      )}

      <Tooltip title="Remove">
        <IconButton variant="soft" color="danger" onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </TitleStyle>
  );
};

export { Title };
