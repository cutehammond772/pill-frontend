import { Container } from "../container";
import * as Style from "./making.style";
import { IndexContainer as IndexContainerElement } from "./index/index";
import { AddIndex } from "./add_index";

import { useEffect } from "react";

import { Collapse } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/reducers";
import { usePillDefaultEditor } from "../../../utils/hooks/pill_creator";
import { useValidation } from "../../../utils/hooks/validation";

import * as IndexContainer from "../../../utils/validators/create/index_container/";
import { ValidatedType } from "../../../utils/validators/validator.type";
import { useLocalization } from "../../../utils/hooks/localization";
import { L10N } from "../../../localization";

const Content = () => {
  const { text } = useLocalization();
  const editor = usePillDefaultEditor();
  const indexes = useSelector((state: RootState) => state.creator.indexes);
  const validator = useValidation(IndexContainer.Validator);
  const validation = validator.validation;

  useEffect(() => {
    validator.validate({ indexSize: indexes.length });
  }, [indexes.length, validator]);

  return (
    <Container
      title={text(L10N.PAGE_CREATE_07)}
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

export { Content };
