import Container from "../container";

import * as Style from "./naming.style";
import * as CategoryStyle from "./category/category.style";

import PillTablet from "../../../components/tablet";
import { Dummies, DummyContainer } from "../../../components/tablet/dummy";
import { usePillDefaultEditor } from "../../../utils/hooks/editor";

import * as React from "react";
import { AddCategoryButton, CategoryButton } from "./category";
import { Collapse } from "@mui/material";

import NamingValidator from "../../../utils/validators/create/naming";
import { useValidation, useValidator } from "../../../utils/hooks/validation";
import { useI18n } from "../../../utils/hooks/i18n";
import { I18N } from "../../../utils/i18n";
import { useSelector } from "react-redux";
import { validateTitle } from "./validation";
import { useSnackbar } from "notistack";
import { StaticSelectors as selectors } from "../../../utils/reducers/profile";

export const Content = () => {
  const { text } = useI18n();
  const { enqueueSnackbar } = useSnackbar();

  const validator = useValidator(NamingValidator());
  const validation = validator.validation;

  const editor = usePillDefaultEditor();
  const profile = useSelector(selectors.PROFILE);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const validateMsg = validateTitle(value);

    if (!!validateMsg) {
      enqueueSnackbar(text(validateMsg), {
        variant: "error",
        preventDuplicate: true,
      });
      return;
    }
    editor.updateTitle(value);
  };

  useValidation(validator.validate, { title: editor.title });
  useValidation(validator.validate, { categories: editor.categories.length });

  const handleCategoryAdd = (category: string) => {
    editor.addCategory(category);
  };

  const handleCategoryRemove = (categoryId: string) => {
    editor.removeCategory(categoryId);
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
            title={editor.title || ""}
            author={profile.userName}
            likes={0}
            views={0}
          />

          <Style.Form>
            <Style.Title>
              <span className="title">{text(I18N.PAGE_CREATE_02)}</span>
              <input
                placeholder={text(I18N.PAGE_CREATE_03)}
                onChange={handleTitle}
                value={editor.title || ""}
                className="input"
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
