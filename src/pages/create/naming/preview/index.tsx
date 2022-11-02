import {
  BannerStyle,
  BannerAuthorStyle,
  ContainerStyle,
  HistoryStyle,
  LikeButtonStyle,
  LikeButtonContentStyle,
  PreviewBadgeStyle,
} from "./preview.style";

import { PillPreviewProps } from "./preview.type";

import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Chip } from "@mui/joy";

const PillPreview = ({ title, author, likes, time }: PillPreviewProps) => (
  <ContainerStyle>
    <BannerStyle>
      <span>{title}</span>

      <BannerAuthorStyle>
        by{" "}
        <Chip size="sm" color="info">
          {author}
        </Chip>
      </BannerAuthorStyle>

      <LikeButtonStyle>
        <LikeButtonContentStyle>
          <FavoriteIcon color="error" />
          <span>{likes}</span>
        </LikeButtonContentStyle>
      </LikeButtonStyle>
    </BannerStyle>

    <PreviewBadgeStyle color="success" size="sm">
      Preview
    </PreviewBadgeStyle>

    <HistoryStyle>
      <HistoryIcon />
      {time} ago
    </HistoryStyle>
  </ContainerStyle>
);

export { PillPreview };
