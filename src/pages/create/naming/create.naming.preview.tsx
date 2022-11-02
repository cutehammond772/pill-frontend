import {
  PreviewPillBanner,
  PreviewPillBannerAuthor,
  PreviewPillContent,
  PreviewPillHistory,
  PreviewPillLikeButton,
  PreviewPillLikeButtonContent,
  PreviewPillPreviewBadge,
} from "./create.naming.style";

import { PreviewPillProps } from "./create.naming.type";

import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Chip } from "@mui/joy";

const PreviewPill = ({ title, author, likes, time }: PreviewPillProps) => (
  <PreviewPillContent>
    <PreviewPillBanner>
      <span>{title}</span>

      <PreviewPillBannerAuthor>
        by{" "}
        <Chip size="sm" color="info">
          {author}
        </Chip>
      </PreviewPillBannerAuthor>

      <PreviewPillLikeButton>
        <PreviewPillLikeButtonContent>
          <FavoriteIcon color="error" />
          <span>{likes}</span>
        </PreviewPillLikeButtonContent>
      </PreviewPillLikeButton>
    </PreviewPillBanner>

    <PreviewPillPreviewBadge color="success" size="sm">
      Preview
    </PreviewPillPreviewBadge>

    <PreviewPillHistory>
      <HistoryIcon />
      {time} ago
    </PreviewPillHistory>
  </PreviewPillContent>
);

export { PreviewPill };
