import {
  BannerStyle,
  BannerAuthorStyle,
  ContainerStyle,
  HistoryStyle,
  LikeButtonStyle,
  LikeButtonContentStyle,
} from "./preview.style";

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
  <ContainerStyle>
    <BannerStyle>
      <span>{props.title}</span>

      <BannerAuthorStyle>
        by{" "}
        <Chip size="sm" color="info">
          {props.author}
        </Chip>
      </BannerAuthorStyle>

      <LikeButtonStyle>
        <LikeButtonContentStyle>
          <FavoriteIcon color="error" />
          <span>{props.likes}</span>
        </LikeButtonContentStyle>
      </LikeButtonStyle>
    </BannerStyle>

    <HistoryStyle>
      <HistoryIcon />
      {props.time} ago
    </HistoryStyle>
  </ContainerStyle>
);

export { PillPreview };
