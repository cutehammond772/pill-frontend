import {
  ContentContainerStyle,
  ContentContainerTitleStyle,
} from "../content.style";
import { IconButton } from "@mui/joy";
import { Tooltip } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
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

const AddTextButton = ({ onAdd }: { onAdd: AddFunction }) => {
  return (
    <AddContentButton
      icon={<ArticleIcon />}
      title="Text"
      description="add an text into the pill."
      onClick={() => onAdd({ type: PillContentType.TEXT, content: "" })}
    />
  );
};

const TextContent = ({
  children,
  onRemove,
  access,
}: React.PropsWithChildren<{
  onRemove: () => void;
  access: { index: number; contentIndex: number };
}>) => {
  const creator = usePillCreator();

  return (
    <ContentContainerStyle layout={TextContentLayout}>
      <ContentContainerTitleStyle layout={TextContentTitleLayout}>
        <div>
          <ArticleIcon />
          <span>Text</span>
        </div>

        <div>
          {access.contentIndex !== 0 && (
            <Tooltip title="Up">
              <IconButton variant="soft" color="primary">
                <KeyboardArrowUpIcon />
              </IconButton>
            </Tooltip>
          )}

          {access.contentIndex !==
            creator.data.indexes[access.index].contents.length - 1 && (
            <Tooltip title="Down">
              <IconButton variant="soft" color="primary">
                <KeyboardArrowDownIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Remove">
            <IconButton variant="soft" color="danger" onClick={onRemove}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </ContentContainerTitleStyle>
      {children}
    </ContentContainerStyle>
  );
};

export { TextContent, AddTextButton };
