import { Container } from "../container";
import { TextField } from "@mui/joy";

import * as Style from "./naming.style";
import * as CategoryStyle from "./category/category.style";

import PillPreview from "../../../components/preview";
import { usePillDefaultEditor } from "../../../utils/hooks/pill_creator";

import * as React from "react";
import { useState, useEffect } from "react";
import { AddCategoryButton, CategoryButton } from "./category";
import { Collapse } from "@mui/material";
import { useValidation } from "../../../utils/hooks/validation";

import * as Naming from "../../../utils/validators/create/name";
import {
  AddCategoryProps,
  RemoveCategoryProps,
} from "../../../utils/reducers/pill/pill.type";

const Content = () => {
  const editor = usePillDefaultEditor();
  const validator = useValidation(Naming.Validator);
  // 마운트와 관계 없이 값 유지
  const [text, setText] = useState<string>(editor.title);

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setText(value);
    editor.updateTitle({ title: value });
    validator.needValidate();
  };

  const handleCategoryAdd = (props: AddCategoryProps) => {
    editor.addCategory(props);
    validator.needValidate();
  };

  const handleCategoryRemove = (props: RemoveCategoryProps) => {
    editor.removeCategory(props);
    validator.needValidate();
  };

  const isCategoryRemoved = (props: RemoveCategoryProps) =>
    !editor.categories.find(
      (category) => category.categoryId === props.categoryId
    );

  useEffect(() => {
    validator.validate({
      title: text,
      categoriesSize: editor.categories.length,
    });
  }, [editor, text, validator]);

  return (
    <Container
      title="Pill의 첫 인상을 만들어 봅시다."
      complete={validator.isValid()}
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
            {editor.categories.map((category) => (
              <Collapse key={category.categoryId} orientation="horizontal">
                <CategoryButton
                  category={category.category}
                  onRemove={() => handleCategoryRemove(category)}
                  disabled={isCategoryRemoved(category)}
                />
              </Collapse>
            ))}
            <AddCategoryButton onAdd={handleCategoryAdd} />
          </CategoryStyle.TransitionGroup>
        </div>
      </Style.Categories>
    </Container>
  );
};

export { Content };
