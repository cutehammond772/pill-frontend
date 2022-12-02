import Container from "../container";
import { TextField } from "@mui/joy";

import * as Style from "./naming.style";
import * as CategoryStyle from "./category/category.style";

import PillTablet from "../../../components/tablet";
import { Dummies, DummyContainer } from "../../../components/tablet/dummy";
import { usePillDefaultEditor } from "../../../utils/hooks/editor";

import * as React from "react";
import { useState } from "react";
import { AddCategoryButton, CategoryButton } from "./category";
import { Collapse } from "@mui/material";

import NamingValidator from "../../../utils/validators/create/naming";
import { useValidation } from "../../../utils/hooks/validation";
import { useI18n } from "../../../utils/hooks/i18n";
import { I18N } from "../../../utils/i18n";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/reducers";

export const Content = () => {
  const { text } = useI18n();
  const validator = useValidation(NamingValidator());
  const validation = validator.validation;

  const editor = usePillDefaultEditor();
  const profile = useSelector((state: RootState) => state.profile);

  // 마운트와 관계 없이 값 유지
  const [title, setTitle] = useState<string>(editor.title);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    editor.updateTitle(value);

    // 수정*
    validator.validate({
      title: value,
    });
  };

  const handleCategoryAdd = (category: string) => {
    editor.addCategory(category);

    // 수정*
    validator.validate({
      categories: editor.categories.length,
    });
  };

  const handleCategoryRemove = (categoryId: string) => {
    editor.removeCategory(categoryId);

    // 수정*
    validator.validate({
      categories: editor.categories.length,
    });
  };

  const isCategoryRemoved = (categoryId: string) =>
    !editor.categories.find((category) => category.categoryId === categoryId);

  return (
    <Container
      title={text(I18N.PAGE_CREATE_01)}
      complete={!!validation && validation.valid}
      layout={Style.Layout}
    >
      <DummyContainer dummyLayout={Style.DummyLayout}>
        <div className="dummies">
          <Dummies amount={30} />
        </div>
        <div className="items">
          <PillTablet
            title={title}
            author={profile.userName}
            likes={0}
            views={0}
          />

          <Style.Form>
            <Style.Title>
              <span className="title">{text(I18N.PAGE_CREATE_02)}</span>
              <TextField
                placeholder={text(I18N.PAGE_CREATE_03)}
                color="neutral"
                variant="soft"
                fullWidth
                onChange={handleTitle}
                value={title || ""}
              />
            </Style.Title>

            <Style.Categories>
              <span className="title">{text(I18N.PAGE_CREATE_04)}</span>
              <div className="container">
                <CategoryStyle.TransitionGroup>
                  {editor.categories.map((category) => (
                    <Collapse
                      key={category.categoryId}
                      orientation="horizontal"
                    >
                      <CategoryButton
                        category={category.category}
                        onRemove={() =>
                          handleCategoryRemove(category.categoryId)
                        }
                        disabled={isCategoryRemoved(category.categoryId)}
                      />
                    </Collapse>
                  ))}

                  <AddCategoryButton onAdd={handleCategoryAdd} />
                </CategoryStyle.TransitionGroup>
              </div>
            </Style.Categories>
          </Style.Form>
        </div>
      </DummyContainer>
    </Container>
  );
};
