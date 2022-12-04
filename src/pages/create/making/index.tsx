import Container from "../container";
import * as Style from "./making.style";
import { IndexContainer as IndexContainerElement } from "./index/index";
import AddIndex from "./add-index/index";

import { Collapse } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/reducers";
import { usePillDefaultEditor } from "../../../utils/hooks/editor";
import { useValidator } from "../../../utils/hooks/validation";

import IndexContainerValidator from "../../../utils/validators/create/index-container";
import { useI18n } from "../../../utils/hooks/i18n";
import { I18N } from "../../../utils/i18n";

export const Content = () => {
  const { text } = useI18n();
  const editor = usePillDefaultEditor();
  const indexes = useSelector((state: RootState) => state.editor.indexes);
  const validator = useValidator(IndexContainerValidator());
  const validation = validator.validation;

  return (
    <Container
      title={text(I18N.PAGE_CREATE_07)}
      complete={!!validation && validation.valid}
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
