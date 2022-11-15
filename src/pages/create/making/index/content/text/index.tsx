import * as React from "react";
import { useState, useLayoutEffect } from "react";

import * as Style from "../content.style";
import { IconButton, Textarea } from "@mui/joy";
import { Tooltip } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArticleIcon from "@mui/icons-material/Article";

import { TextContentLayout, TextContentTitleLayout } from "./text.style";
import { usePillCreator } from "../../../../../../utils/hooks/pill_creator";
import { AddContentButton } from "../add";
import {
  ContentProps,
  IdProps,
  PillContentType,
} from "../../../../../../utils/reducers/pill/pill.type";
import { useRollback } from "../../../../../../utils/hooks/rollback";

const AddTextButton = (props: IdProps) => {
  const creator = usePillCreator();

  return (
    <AddContentButton
      icon={ArticleIcon}
      title="글"
      description="인덱스 마지막에 글을 추가합니다."
      onClick={() =>
        creator
          .withIndex(props)
          .addContent({ contentType: PillContentType.TEXT })
      }
    />
  );
};

const TextContent = (props: ContentProps) => {
  const creator = usePillCreator();

  const rollback = useRollback();

  const rollbackedIndex = rollback.getIndex(props);
  const rollbackedContent = rollback.getContent(props);

  const index = rollbackedIndex || creator.getIndex(props);
  const data =
    rollbackedContent ||
    rollbackedIndex?.contents.find(
      (content) => content.contentId === props.contentId
    ) ||
    creator.getContent(props);
  const order =
    !!rollbackedIndex || !!rollbackedContent
      ? 0
      : creator.getContentOrder(props);

  const [text, setText] = useState<string>("");

  const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setText(value);

    creator.withIndex(props).updateContent({ ...props, content: value });
  };

  const handleRemove = () => {
    rollback.captureContent(data);
    creator.withIndex(props).removeContent(props);
  };

  useLayoutEffect(() => {
    setText(data.content);
  }, [data.content]);

  return (
    <Style.Container layout={TextContentLayout}>
      <Style.Title layout={TextContentTitleLayout}>
        <div className="container">
          <ArticleIcon className="icon" />
          <span className="title">글</span>
        </div>

        <div className="buttons">
          {order !== 0 && (
            <Tooltip title="Up">
              <IconButton
                variant="outlined"
                color="primary"
                onClick={() => {
                  const prevContent = index.contents.at(order - 1);

                  if (!prevContent) {
                    throw new Error();
                  }

                  creator.withIndex(props).exchangeContent({
                    contentId: props.contentId,
                    exchangeId: prevContent.contentId,
                  });
                }}
                {...((!!rollbackedIndex || !!rollbackedContent) && {
                  disabled: true,
                })}
              >
                <KeyboardArrowUpIcon />
              </IconButton>
            </Tooltip>
          )}

          {order !== index.contents.length - 1 && (
            <Tooltip title="Down">
              <IconButton
                variant="outlined"
                color="primary"
                onClick={() => {
                  const nextContent = index.contents.at(order + 1);

                  if (!nextContent) {
                    throw new Error();
                  }

                  creator.withIndex(props).exchangeContent({
                    contentId: props.contentId,
                    exchangeId: nextContent.contentId,
                  });
                }}
                {...((!!rollbackedIndex || !!rollbackedContent) && {
                  disabled: true,
                })}
              >
                <KeyboardArrowDownIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Remove">
            <IconButton
              variant="soft"
              color="danger"
              onClick={handleRemove}
              {...((!!rollbackedIndex || !!rollbackedContent) && {
                disabled: true,
              })}
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
        value={text || ""}
      />
    </Style.Container>
  );
};

export { TextContent, AddTextButton };
