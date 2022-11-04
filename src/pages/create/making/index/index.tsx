import { Box, IconButton, TextField, Typography, Chip } from "@mui/joy";
import { Tooltip } from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

import { AddIndexStyle } from "../making.style";

import {
  IndexContainerStyle,
  IndexContainerTitleStyle,
  AddContentContainerStyle,
} from "./index.style";

import { usePillCreator } from "../../../../utils/hooks/pill_creator";

import * as React from "react";
import { useState } from "react";
import { UpdateType } from "../../../../utils/hooks/pill_creator/pill_creator.type";
import { TitleEditButtonStyle } from "./index.style";

const AddIndex = ({ onClick }: { onClick: () => void }) => {
  return (
    <AddIndexStyle color="info" variant="contained" onClick={onClick}>
      <AddIcon />
      <span>Add Index</span>
    </AddIndexStyle>
  );
};

const IndexContainer = ({
  index,
  onRemove,
}: {
  index: number;
  onRemove: () => void;
}) => (
  <IndexContainerStyle>
    <IndexContainerTitle index={index} onRemove={onRemove} />

    <AddContentContainer>
      <PtIndexContentButton />
      <PtIndexContentButton />
    </AddContentContainer>
  </IndexContainerStyle>
);

const IndexContainerTitle = ({
  index,
  onRemove,
}: {
  index: number;
  onRemove: () => void;
}) => {
  const creator = usePillCreator();

  const [title, setTitle] = useState<string>(creator.data.indexes[index].title);
  const [edit, setEdit] = useState<boolean>(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  const closeEdit = () => {
    setEdit(false);
    creator.update(UpdateType.INDEX_TITLE, { index: index, title: title });
  };

  return (
    <IndexContainerTitleStyle>
      <span>#{index + 1}</span>
      {!edit ? (
        <TitleEditButtonStyle
          color="info"
          variant="plain"
          onClick={() => setEdit(true)}
          endDecorator={
            <Chip size="sm" color="info">
              Click to Edit
            </Chip>
          }
        >
          {!title ? "Untitled" : title}
        </TitleEditButtonStyle>
      ) : (
        <>
          <TextField
            placeholder="type in here...."
            fullWidth
            // only way to bring text
            onChange={handleTitle}
            onBlur={closeEdit}
            defaultValue={title}
          />

          <Tooltip title="Done">
            <IconButton variant="soft" color="success" onClick={closeEdit}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
        </>
      )}

      <Tooltip title="Remove">
        <IconButton variant="soft" color="danger" onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </IndexContainerTitleStyle>
  );
};

const AddContentContainer = ({ children }: React.PropsWithChildren) => (
  <AddContentContainerStyle>
    <Box
      sx={{
        gridColumn: "1 / 3",
        display: "flex",
        flexFlow: "row",
        columnGap: "10px",
        alignItems: "center",
      }}
    >
      <AddIcon
        sx={{
          fontSize: "30px",
        }}
      />
      <Typography
        sx={{
          fontFamily: "Inter",
          fontWeight: "600",
          fontSize: "20px",
          userSelect: "none",
        }}
      >
        Add Content
      </Typography>
    </Box>
    {children}
  </AddContentContainerStyle>
);

const PtIndexContentButton = () => (
  <Box
    sx={{
      width: "auto",
      height: "auto",
      borderRadius: "5px",
      p: "15px",
      background: "lightgrey",

      display: "grid",
      gridTemplateColumns: "60px 1fr",
      gridTemplateRows: "2fr 3fr",
      alignItems: "center",

      userSelect: "none",
    }}
  >
    <ImageIcon
      sx={{
        gridRow: "1 / 3",
        fontSize: "45px",
      }}
    />
    <Typography
      sx={{
        fontFamily: "Inter",
        fontWeight: "600",
        fontSize: "20px",
      }}
    >
      Image
    </Typography>
    <Typography
      sx={{
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: "18px",
      }}
    >
      add an image into the pill.
    </Typography>
  </Box>
);

export { AddIndex, IndexContainer };
