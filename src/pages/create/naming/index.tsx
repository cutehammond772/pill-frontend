import { Container } from "../container";
import { TextField, Chip } from "@mui/joy";

import * as Style from "./naming.style";
import { PillPreview } from "../../../components/preview";
import { usePillCreator } from "../../../utils/hooks/pill_creator";
import { UpdateType } from "../../../utils/hooks/pill_creator/pill_creator.type";

import CheckIcon from "@mui/icons-material/Check";

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
    <Container title="Pill your cover." complete={false} layout={Style.Layout}>
      <PillPreview
        title={!text ? "Untitled" : text}
        author="cutehammond"
        likes={999}
        time="less than a minute"
      />

      <Style.Title>
        <span className="title">Title</span>
        <TextField placeholder="Type in here..." color="neutral" variant="soft" fullWidth onChange={handleText} />
      </Style.Title>

      <Style.Categories>
        <span className="title">Categories</span>
        <div className="container">
          <Chip color="neutral" variant="solid">Recipe</Chip>
          <Chip color="success" variant="solid" endDecorator={<CheckIcon/>} onClick={() => {}} sx={{
            userSelect: "none"
          }}>Food</Chip>
        </div>
      </Style.Categories>
    </Container>
  );
};

export { Content };
