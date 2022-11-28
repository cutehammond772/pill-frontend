import { IconButton, TextField } from "@mui/joy";
import { Tooltip } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import * as React from "react";
import * as Style from "./title.style";
import { useI18n } from "../../../../../utils/hooks/i18n";
import { I18N } from "../../../../../i18n";

interface TitleProps {
  order: number;
  title: string;
  removed: boolean;

  onRemove: () => void;
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Title = (props: TitleProps) => {
  const { text } = useI18n();

  return (
    <Style.Title>
      <span className="index">#{props.order + 1}</span>
      <TextField
        placeholder={text(I18N.PAGE_CREATE_09)}
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

      <Tooltip title={text(I18N.PAGE_CREATE_30)}>
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
