import * as React from "react";
import { useState, useCallback, useEffect } from "react";

import * as Style from "../content.style";
import { IconButton, Textarea } from "@mui/joy";
import { Tooltip } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArticleIcon from "@mui/icons-material/Article";

import { TextContentLayout, TextContentTitleLayout } from "./text.style";
import { AddContentButton } from "../add";
import {
  usePillContentEditor,
  usePillIndexEditor,
} from "../../../../../../utils/hooks/pill-creator";
import { PillContentType } from "../../../../../../utils/reducers/creator";
import { IndexContentProps } from "../content.type";
import * as Content from "../../../../../../utils/validators/create/content";
import { useValidation } from "../../../../../../utils/hooks/validation";
import { useLocalization } from "../../../../../../utils/hooks/l10n";
import { L10N } from "../../../../../../localization";

interface AddTextButtonProps {
  id: string;
}

export const AddTextButton = (props: AddTextButtonProps) => {
  const { text } = useLocalization();
  const editor = usePillIndexEditor(props.id);

  const handleAddText = useCallback(() => {
    editor.addContent(PillContentType.TEXT, "");
  }, [editor]);

  return <AddContentButton
    icon={ArticleIcon}
    title={text(L10N.PAGE_CREATE_13)}
    description={text(L10N.PAGE_CREATE_14)}
    onClick={handleAddText}
  />;
};

export const TextContent = (props: IndexContentProps) => {
  const { text } = useLocalization();
  const editor = usePillContentEditor(props.id, props.contentId);
  const validator = useValidation(Content.Validator(props.contentId, props.id));

  const [content, setContent] = useState<string>(editor.content.content);

  const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    setContent(value);
    editor.update(value);
    validator.needValidate();
  };

  const handleExchange = (relation: number) => {
    props.onExchange(relation);
    validator.needValidate();
  };

  useEffect(() => {
    validator.validate({
      type: PillContentType.TEXT,
      content: editor.content.content,
      subContent: "",
    });
  }, [validator, editor.content]);

  const handleRemove = () => {
    editor.remove();
    validator.remove();
  };

  return (
    <Style.Container layout={TextContentLayout}>
      <Style.Title layout={TextContentTitleLayout}>
        <div className="container">
          <ArticleIcon className="icon" />
          <span className="title">{text(L10N.PAGE_CREATE_26)}</span>
        </div>
        <div className="buttons">
          {props.order !== 0 && (
            <Tooltip title={text(L10N.PAGE_CREATE_27)}>
              <IconButton
                variant="outlined"
                color="primary"
                onClick={() => handleExchange(-1)}
                disabled={props.removed}
              >
                <KeyboardArrowUpIcon />
              </IconButton>
            </Tooltip>
          )}

          {!props.isEnd && (
            <Tooltip title={text(L10N.PAGE_CREATE_28)}>
              <IconButton
                variant="outlined"
                color="primary"
                onClick={() => handleExchange(+1)}
                disabled={props.removed}
              >
                <KeyboardArrowDownIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title={text(L10N.PAGE_CREATE_30)}>
            <IconButton
              variant="soft"
              color="danger"
              onClick={handleRemove}
              disabled={props.removed}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Style.Title>

      <Textarea
        minRows={4}
        sx={{
          fontSize: "20px",
        }}
        onChange={handleText}
        value={content || ""}
      />
    </Style.Container>
  );
};
