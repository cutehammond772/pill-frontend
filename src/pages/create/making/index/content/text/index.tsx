import * as React from "react";
import { useState, useEffect } from "react";

import * as Style from "../content.style";
import { IconButton, Textarea } from "@mui/joy";
import { Tooltip } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArticleIcon from "@mui/icons-material/Article";

import { TextContentLayout, TextContentTitleLayout } from "./text.style";
import { usePillCreator } from "../../../../../../utils/hooks/pill_creator";
import {
  AddFunction,
  PillContentType,
} from "../../../../../../utils/reducers/pill/pill.type";
import { AddContentButton } from "../add";
import { UpdateType } from "../../../../../../utils/hooks/pill_creator/pill_creator.type";
import { ContentProps } from "../content.type";

interface AddTextButtonProps {
  onAdd: AddFunction;
}

const AddTextButton = React.forwardRef<HTMLButtonElement, AddTextButtonProps>(
  (props, ref) => {
    const { onAdd, ...refProps } = props;

    return (
      <AddContentButton
        icon={<ArticleIcon />}
        title="Text"
        description="add a text into the pill."
        onClick={() => props.onAdd({ type: PillContentType.TEXT, content: "" })}
        ref={ref}
        {...refProps}
      />
    );
  }
);

const TextContent = React.forwardRef<HTMLDivElement, ContentProps>(
  (props, ref) => {
    const creator = usePillCreator();
    const [text, setText] = useState<string>(
      creator.data.indexes[props.access.index].contents[
        props.access.contentIndex
      ].content || ""
    );

    // refresh after exchange
    const { refresh, completeRefresh } = props.refreshEvent;

    const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setText(value);

      creator.update(UpdateType.INDEX_CONTENT, {
        ...props.access,
        content: value,
      });
    };

    useEffect(() => {
      if (refresh) {
        setText(
          creator.data.indexes[props.access.index].contents[
            props.access.contentIndex
          ].content || ""
        );
        
        completeRefresh();
      }

    }, [creator.data.indexes, props.access, completeRefresh, refresh]);

    const { onRemove, onExchange, ...refProps } = props;

    return (
      <Style.Container layout={TextContentLayout} ref={ref} {...refProps}>
        <Style.Title layout={TextContentTitleLayout}>
          <div>
            <ArticleIcon />
            <span>Text</span>
          </div>

          <div>
            {props.access.contentIndex !== 0 && (
              <Tooltip title="Up">
                <IconButton
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    props.onExchange(
                      props.access.contentIndex,
                      props.access.contentIndex - 1
                    );
                  }}
                >
                  <KeyboardArrowUpIcon />
                </IconButton>
              </Tooltip>
            )}

            {props.access.contentIndex !==
              creator.data.indexes[props.access.index].contents.length - 1 && (
              <Tooltip title="Down">
                <IconButton
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    props.onExchange(
                      props.access.contentIndex,
                      props.access.contentIndex + 1
                    );
                  }}
                >
                  <KeyboardArrowDownIcon />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Remove">
              <IconButton
                variant="soft"
                color="danger"
                onClick={props.onRemove}
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
  }
);

export { TextContent, AddTextButton };
