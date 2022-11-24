import { Container } from "../container";
import { TextField } from "@mui/joy";

import * as Style from "./naming.style";
import * as CategoryStyle from "./category/category.style";

import PillTablet from "../../../components/tablet";
import { usePillDefaultEditor } from "../../../utils/hooks/pill_creator";

import * as React from "react";
import { useState, useEffect } from "react";
import { AddCategoryButton, CategoryButton } from "./category";
import { Collapse } from "@mui/material";

import * as Naming from "../../../utils/validators/create/naming";
import { ValidatedType } from "../../../utils/validators/validator.type";
import { useValidation } from "../../../utils/hooks/validation";
import { useProfile } from "../../../utils/hooks/profile";
import { useLocalization } from "../../../utils/hooks/localization";
import { L10N } from "../../../localization";

const RANDOM_TITLES_LENGTH = 13;

const RANDOM_TITLES = [
  "Lorem ipsum dolor sit amet",
  "consectetur adipiscing elit",
  "sed do eiusmod tempor incididunt ut",
  "labore et dolore magna aliqua",
  "Ut enim ad minim veniam",
  "quis nostrud exercitation ullamco laboris",
  "nisi ut aliquip ex ea commodo consequat",
  "Duis aute irure dolor in reprehenderit",
  "in voluptate velit esse cillum",
  "dolore eu fugiat nulla pariatur",
  "Excepteur sint occaecat cupidatat non proident",
  "sunt in culpa qui officia",
  "deserunt mollit anim id est laborum",
];

const RANDOM_AUTHORS_LENGTH = 10;

const RANDOM_AUTHORS = [
  "Etiam",
  "vel",
  "dolor",
  "non",
  "lacus",
  "pretium",
  "efficitur",
  "gravida",
  "eget",
  "massa",
];

const RandomPillTablets = React.memo((props: { amount: number }) => (
  <>
    {[...Array(props.amount).keys()].map((index) => (
      <div className="backdrop-container">
        <div className="backdrop" />
        <PillTablet
          title={
            RANDOM_TITLES[Math.floor(Math.random() * RANDOM_TITLES_LENGTH)]
          }
          author={
            RANDOM_AUTHORS[Math.floor(Math.random() * RANDOM_AUTHORS_LENGTH)]
          }
          likes={Math.floor(Math.random() * 1000)}
          views={Math.floor(Math.random() * 1000)}
          key={index}
        />
      </div>
    ))}
  </>
));

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
      <Style.Tablets>
        <div className="backdrop" />
        
        <div className="row">
          <RandomPillTablets amount={4} />
        </div>
        <div className="row">
          <RandomPillTablets amount={1} />
          <PillTablet
            title={title}
            author={profile.data.userName}
            likes={999}
            views={102}
          />
          <RandomPillTablets amount={2} />
        </div>
        <div className="row">
          <RandomPillTablets amount={4} />
        </div>
      </Style.Tablets>

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
      </Style.Form>
    </Container>
  );
};

export { Content };
