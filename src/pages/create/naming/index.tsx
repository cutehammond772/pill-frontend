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

import * as Naming from "../../../utils/validators/create/naming";
import { ValidatedType } from "../../../utils/validators/validator.type";
import { useValidation } from "../../../utils/hooks/validation";
import { useProfile } from "../../../utils/hooks/profile";

const Content = () => {
  const validator = useValidation(Naming.Validator);
  const validation = validator.validation;

  const editor = usePillDefaultEditor();
  const profile = useProfile();

  // 마운트와 관계 없이 값 유지
  const [text, setText] = useState<string>(editor.title);

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setText(value);
    editor.updateTitle(value);
    validator.needValidate();
  };

  const handleCategoryAdd = (category: string) => {
    editor.addCategory(category);
    validator.needValidate();
  };

  const handleCategoryRemove = (categoryId: string) => {
    editor.removeCategory(categoryId);
    validator.needValidate();
  };

  const isCategoryRemoved = (categoryId: string) =>
    !editor.categories.find(
      (category) => category.categoryId === categoryId
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
      complete={!!validation && validation.result === ValidatedType.VALID}
      layout={Style.Layout}
    >
      <PillPreview
        title={text || "Untitled"}
        author={profile.data.userName || "Guest"}
        likes={999}
        time="방금"
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
                  onRemove={() => handleCategoryRemove(category.categoryId)}
                  disabled={isCategoryRemoved(category.categoryId)}
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
