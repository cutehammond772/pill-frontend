import { Container } from "../container";
import { TextField } from "@mui/joy";

import { Layout, TitleStyle, CategoriesStyle } from "./naming.style";
import { PillPreview } from "./preview";
import { usePillCreator } from "../../../utils/hooks/pill_creator";
import { UpdateType } from "../../../utils/hooks/pill_creator/pill_creator.type";

import * as React from "react";
import { useState } from "react";

const Content = () => {
  const creator = usePillCreator();
  const [text, setText] = useState<string>("");

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setText(value);

    creator.update(UpdateType.PILL_TITLE, { title: text });
  };

  return (
    <Container title="Pill your cover." complete={false} layout={Layout}>
      <PillPreview
        title={!text ? "Untitled" : text}
        author="cutehammond"
        likes={999}
        time="less than a minute"
      />

      <TitleStyle>
        <span>Title</span>
        <TextField placeholder="Type in here..." color="neutral" variant="soft" fullWidth onChange={handleText} />
      </TitleStyle>

      <CategoriesStyle>
        <span>Categories</span>
      </CategoriesStyle>
    </Container>
  );
};

export { Content };
