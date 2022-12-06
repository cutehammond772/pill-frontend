import { TextField } from "@mui/joy";

import * as React from "react";
import * as Style from "./title.style";
import { useI18n } from "../../../../../utils/hooks/i18n";
import { I18N } from "../../../../../utils/i18n";
import { DeleteButton } from "../content/buttons";

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
              fontWeight: "500",
              fontSize: "20px",
              alignSelf: "center",
              color: "var(--light)",
            },
          },
        }}
      />

      <DeleteButton
        text={text}
        disabled={props.removed}
        onClick={props.onRemove}
      />
    </Style.Title>
  );
};

export default React.memo(Title);
