import * as React from "react";
import { useCallback, useState } from "react";

import * as Style from "../content.style";
import { Textarea } from "@mui/joy";
import ArticleIcon from "@mui/icons-material/Article";

import { TextContentLayout, TextContentTitleLayout } from "./text.style";
import { AddContentButton } from "../add";
import {
  usePillContentEditor,
  usePillIndexEditor,
} from "../../../../../../utils/hooks/editor";
import { PillContentType } from "../../../../../../utils/pill/pill.type";
import { IndexContentProps } from "../content.type";
import {
  useValidation,
  useValidator,
} from "../../../../../../utils/hooks/validation";
import { useI18n } from "../../../../../../utils/hooks/i18n";
import { I18N } from "../../../../../../utils/i18n";

import TextValidator from "../../../../../../utils/validators/create/content/text";
import { DeleteButton, DownButton, MenuButton, UpButton } from "../buttons";

interface AddTextButtonProps {
  id: string;
}

export const AddTextButton = (props: AddTextButtonProps) => {
  const { text } = useI18n();
  const editor = usePillIndexEditor(props.id);

  const handleAddText = useCallback(() => {
    editor.addContent(PillContentType.TEXT, "");
  }, [editor]);

  return (
    <AddContentButton
      icon={ArticleIcon}
      title={text(I18N.PAGE_CREATE_13)}
      description={text(I18N.PAGE_CREATE_14)}
      onClick={handleAddText}
    />
  );
};

export const TextContent = (props: IndexContentProps) => {
  const { text } = useI18n();
  const editor = usePillContentEditor(props.id, props.contentId);
  const validator = useValidator(TextValidator(props.contentId, props.id));

  const [open, setOpen] = useState<boolean>(false);

  const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    editor.update(value);
  };

  const handleExchange = (relation: number) => {
    props.onExchange(relation);
  };

  const handleRemove = () => {
    editor.remove();
    validator.remove();
  };

  useValidation(validator.validate, { content: editor.content.content });

  return (
    <Style.Container layout={TextContentLayout}>
      <Style.Title layout={TextContentTitleLayout}>
        <div className="container">
          <ArticleIcon className="icon" />
          <span className="title">{text(I18N.PAGE_CREATE_26)}</span>
        </div>

        <Style.MenuButtons open={open}>
          <MenuButton
            open={open}
            onClick={() => setOpen(!open)}
            disabled={props.removed}
          />

          {props.order !== 0 && (
            <UpButton
              text={text}
              disabled={props.removed}
              onClick={() => handleExchange(-1)}
            />
          )}

          {!props.isEnd && (
            <DownButton
              text={text}
              disabled={props.removed}
              onClick={() => handleExchange(+1)}
            />
          )}

          <DeleteButton
            text={text}
            disabled={props.removed}
            onClick={handleRemove}
          />
        </Style.MenuButtons>
      </Style.Title>

      <Textarea
        minRows={4}
        sx={{
          fontSize: "20px",
        }}
        onChange={handleText}
        value={editor.content.content || ""}
      />
    </Style.Container>
  );
};
