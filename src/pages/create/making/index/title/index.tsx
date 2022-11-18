import { IconButton, TextField } from "@mui/joy";
import { Tooltip } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import * as React from "react";
import * as Style from "./title.style";

interface TitleProps {
  order: number;
  title: string;
  removed: boolean;

  onRemove: () => void;
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Title = (props: TitleProps) => {
  return (
    <Style.Title>
      <span className="index">#{props.order + 1}</span>
      <TextField
        placeholder="최대 40자까지 입력할 수 있습니다."
        fullWidth
        onChange={props.onTextChange}
        value={props.title || ""}
        componentsProps={{
          input: {
            style: {
              backgroundColor: "rgba(255, 255, 255, 0)",
              border: "none",
              fontWeight: "700",
              fontSize: "20px",
              alignSelf: "center",
            },
          },
        }}
      />

      <Tooltip title="Remove">
        <IconButton
          variant="soft"
          color="danger"
          onClick={props.onRemove}
          {...(!!props.removed && { disabled: true })}
        >
          <DeleteIcon className="remove" />
        </IconButton>
      </Tooltip>
    </Style.Title>
  );
};

export default React.memo(Title);
