import Container from "../container";
import * as Style from "./making.style";
import { IndexContainer as IndexContainerElement } from "./index/index";
import AddIndex from "./add-index/index";

import { useEffect } from "react";

import { Collapse } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/reducers";
import { usePillDefaultEditor } from "../../../utils/hooks/pill-creator";
import { useValidation } from "../../../utils/hooks/validation";

import * as IndexContainer from "../../../utils/validators/create/index-container";
import { ValidatedType } from "../../../utils/validators/validator.type";
import { useI18n } from "../../../utils/hooks/i18n";
import { I18N } from "../../../i18n";

export const Content = () => {
  const { text } = useI18n();
  const editor = usePillDefaultEditor();
  const indexes = useSelector((state: RootState) => state.creator.indexes);
  const validator = useValidation(IndexContainer.Validator);
  const validation = validator.validation;

  useEffect(() => {
    validator.validate({ indexSize: indexes.length });
  }, [indexes.length, validator]);

  return (
    <Container
      title={text(I18N.PAGE_CREATE_07)}
      complete={!!validation && validation.result === ValidatedType.VALID}
      layout={Style.Layout}
    >
      <Style.TransitionGroup>
        {indexes.map((index, order) => (
          <Collapse key={index.id}>
            <IndexContainerElement id={index.id} order={order} />
          </Collapse>
        ))}
      </Style.TransitionGroup>

      <AddIndex onClick={editor.addIndex} />
    </Container>
  );
};
