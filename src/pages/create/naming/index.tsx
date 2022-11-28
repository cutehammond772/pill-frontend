import { Container } from "../container";
import { TextField } from "@mui/joy";

import * as Style from "./naming.style";
import * as CategoryStyle from "./category/category.style";

import PillTablet from "../../../components/tablet";
import { Dummies, DummyContainer } from "../../../components/tablet/dummy";
import { usePillDefaultEditor } from "../../../utils/hooks/pill-creator";

import * as React from "react";
import { useState, useEffect } from "react";
import { AddCategoryButton, CategoryButton } from "./category";
import { Collapse } from "@mui/material";

import * as Naming from "../../../utils/validators/create/naming";
import { ValidatedType } from "../../../utils/validators/validator.type";
import { useValidation } from "../../../utils/hooks/validation";
import { useProfile } from "../../../utils/hooks/profile";
import { useLocalization } from "../../../utils/hooks/l10n";
import { L10N } from "../../../localization";

const Content = () => {
  const { text } = useLocalization();
  const validator = useValidation(Naming.Validator);
  const validation = validator.validation;

  const editor = usePillDefaultEditor();
  const profile = useProfile();

  // 마운트와 관계 없이 값 유지
  const [title, setTitle] = useState<string>(editor.title);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
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
    !editor.categories.find((category) => category.categoryId === categoryId);

  useEffect(() => {
    validator.validate({
      title: title,
      categoriesSize: editor.categories.length,
    });
  }, [editor, title, validator]);

  return (
    <Container
      title={text(L10N.PAGE_CREATE_01)}
      complete={!!validation && validation.result === ValidatedType.VALID}
      layout={Style.Layout}
    >
      <DummyContainer dummyLayout={Style.DummyLayout}>
        <div className="dummies">
          <Dummies amount={30} />
        </div>
        <div className="items">
          <PillTablet
            title={title}
            author={profile.data.userName}
            likes={0}
            views={0}
          />

          <Style.Form>
            <Style.Title>
              <span className="title">{text(L10N.PAGE_CREATE_02)}</span>
              <TextField
                placeholder={text(L10N.PAGE_CREATE_03)}
                color="neutral"
                variant="soft"
                fullWidth
                onChange={handleTitle}
                value={title || ""}
              />
            </Style.Title>

            <Style.Categories>
              <span className="title">{text(L10N.PAGE_CREATE_04)}</span>
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

export { Content };
