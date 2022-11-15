import * as React from "react";
import * as Style from "./preview.style";

import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Chip } from "@mui/joy";

interface PillPreviewProps {
  title: string;
  author: string;
  likes: number;
  time: string;
}

const PillPreview = (props: PillPreviewProps) => (
  <Style.Container>
    <Style.Banner>
      <span className="title">{props.title}</span>

      <Style.BannerAuthor>
        by{" "}
        <Chip size="sm" color="info">
          {props.author}
        </Chip>
      </Style.BannerAuthor>

      <Style.LikeButton>
        <Style.LikeButtonContent>
          <FavoriteIcon color="error" />
          <span>{props.likes}</span>
        </Style.LikeButtonContent>
      </Style.LikeButton>
    </Style.Banner>

    <Style.History>
      <HistoryIcon />
      {props.time} ago
    </Style.History>
  </Style.Container>
);

export default React.memo(PillPreview);
