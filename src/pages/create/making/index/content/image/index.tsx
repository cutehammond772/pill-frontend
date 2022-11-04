import { ContentContainerStyle, ContentContainerTitleStyle } from "../content.style";
import { IconButton } from "@mui/joy";
import { Tooltip } from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";

import {
  ImageContentLayout,
  ImageContentTitleLayout,
} from "./image.style";

const ImageContent = ({ children }: React.PropsWithChildren) => (
  <ContentContainerStyle layout={ImageContentLayout}>
    <ContentContainerTitleStyle layout={ImageContentTitleLayout}>
      <div>
        <ImageIcon />
        <span>Image</span>
      </div>

      <div>
        <Tooltip title="Up">
          <IconButton variant="soft" color="primary">
            <KeyboardArrowUpIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Down">
          <IconButton variant="soft" color="primary">
            <KeyboardArrowDownIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit">
          <IconButton variant="soft" color="info">
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Remove">
          <IconButton variant="soft" color="danger">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    </ContentContainerTitleStyle>
    {children}
  </ContentContainerStyle>
);

export { ImageContent };
