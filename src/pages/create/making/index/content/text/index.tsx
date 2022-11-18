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
} from "../../../../../../utils/hooks/pill_creator";
import { PillContentType } from "../../../../../../utils/reducers/pill/pill.type";
import { IndexContentProps } from "../content.type";
import * as Content from "../../../../../../utils/validators/create/content";
import { useValidation } from "../../../../../../utils/hooks/validation";

interface AddTextButtonProps {
  id: string;
}

const MemoizedTextButton = React.memo((props: { onClick: () => void }) => (
  <AddContentButton
    icon={ArticleIcon}
    title="글"
    description="인덱스 마지막에 글을 추가합니다."
    onClick={props.onClick}
  />
));

const AddTextButton = (props: AddTextButtonProps) => {
  const editor = usePillIndexEditor({ id: props.id });

  const handleAddText = useCallback(() => {
    editor.addContent({
      contentType: PillContentType.TEXT,
      content: "",
    });
  }, [editor]);

  return <MemoizedTextButton onClick={handleAddText} />;
};

const TextContent = (props: IndexContentProps) => {
  const editor = usePillContentEditor({
    id: props.id,
    contentId: props.contentId,
  });
  const validator = useValidation(Content.Validator({ id: props.contentId }));

  const [content, setContent] = useState<string>(editor.content.content);

  const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    setContent(value);
    editor.update({ content: value });
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

  return (
    <Style.Container layout={TextContentLayout}>
      <Style.Title layout={TextContentTitleLayout}>
        <div className="container">
          <ArticleIcon className="icon" />
          <span className="title">글</span>
        </div>
        <div className="buttons">
          {props.order !== 0 && (
            <Tooltip title="Up">
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
            <Tooltip title="Down">
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

          <Tooltip title="Remove">
            <IconButton
              variant="soft"
              color="danger"
              onClick={editor.remove}
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

export { TextContent, AddTextButton };
