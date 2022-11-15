import { IconButton, TextField } from "@mui/joy";
import { Tooltip } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import * as React from "react";
import { useState } from "react";

import { usePillCreator } from "../../../../../utils/hooks/pill_creator";

import * as Style from "./title.style";
import { useRollback } from "../../../../../utils/hooks/rollback";

interface TitleProps {
  id: string;
  order: number;
}

const Title = (props: TitleProps) => {
  const creator = usePillCreator();

  const rollback = useRollback();
  const rollbackedIndex = rollback.getIndex(props);

  const index = rollbackedIndex || creator.getIndex(props);

  const [title, setTitle] = useState<string>(index.title);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.length <= 40) {
      creator.withIndex(props).updateTitle({ title: value });
      setTitle(value);
    }
  };

  const handleRemove = () => {
    rollback.captureIndex(index);
    creator.withIndex(props).remove();
  };

  return (
    <Style.Title>
      <span className="index">#{props.order + 1}</span>
      <TextField
        placeholder="최대 40자까지 입력할 수 있습니다."
        fullWidth
        onChange={handleTitle}
        value={title || ""}
        componentsProps={{
          input: {style: {backgroundColor: "rgba(255, 255, 255, 0)", border: "none", fontWeight: "700", fontSize: "20px", alignSelf: "center"}}
        }}
      />

      <Tooltip title="Remove">
        <IconButton
          variant="soft"
          color="danger"
          onClick={handleRemove}
          {...(!!rollbackedIndex && { disabled: true })}
        >
          <DeleteIcon className="remove" />
        </IconButton>
      </Tooltip>
    </Style.Title>
  );
};

export { Title };
