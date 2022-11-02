import { Box, TextField, Typography } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import ImageIcon from "@mui/icons-material/Image";

import AddIcon from "@mui/icons-material/Add";
import {
  AddIndexStyle,
  IndexContainerStyle,
  IndexContainerTitleStyle,
  AddContentContainerStyle,
} from "./making.style";

const AddIndex = () => (
  <AddIndexStyle>
    <AddIcon />
    <span>Add Index</span>
  </AddIndexStyle>
);


const IndexContainer = () => (
  <IndexContainerStyle>
    <IndexContainerTitle />

    <AddContentContainer>
      <PtIndexContentButton />
      <PtIndexContentButton />
    </AddContentContainer>
  </IndexContainerStyle>
);

const IndexContainerTitle = () => (
  <IndexContainerTitleStyle>
    <span>#1</span>
    <TextField placeholder="type a name of index." fullWidth />
    <MenuIcon />
  </IndexContainerTitleStyle>
);

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