import { Container } from "../container";
import { TextField } from "@mui/joy";

import * as Style from "./naming.style";
import * as CategoryStyle from "./category/category.style";

import PillPreview from "../../../components/preview";
import { usePillCreator } from "../../../utils/hooks/pill_creator";

import * as React from "react";
import { useState } from "react";
import { AddCategory, Category } from "./category";
import { Collapse } from "@mui/material";

const Content = () => {
  const creator = usePillCreator();
  // 마운트와 관계 없이 값 유지
  const [text, setText] = useState<string>(creator.data.title);

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setText(value);
    creator.updateTitle(value);
  };

  return (
    <Container
      title="Pill의 첫 인상을 만들어 봅시다."
      complete={false}
      layout={Style.Layout}
    >
      <PillPreview
        title={!text ? "Untitled" : text}
        author="cutehammond"
        likes={999}
        time="less than a minute"
      />

      <Style.Title>
        <span className="title">제목</span>
        <TextField
          placeholder="제목을 입력해 주세요."
          color="neutral"
          variant="soft"
          fullWidth
          onChange={handleText}
          value={text || ""}
        />
      </Style.Title>

      <Style.Categories>
        <span className="title">카테고리</span>
        <div className="container">
          <CategoryStyle.TransitionGroup>
            {creator.data.categories.map((category) => (
              <Collapse key={category.categoryId} orientation="horizontal">
                <Category {...category} />
              </Collapse>
            ))}
            <AddCategory />
          </CategoryStyle.TransitionGroup>
        </div>
      </Style.Categories>
    </Container>
  );
};

export { Content };
