import { ListItem, ListItemContent, Chip } from "@mui/joy";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  ButtonsStyle,
  ContentStyle,
  HeaderStyle,
  TitleStyle,
} from "./rc.style";

const ReceivedComment = ({
  title,
  userName,
  comment,
}: {
  title: string;
  userName: string;
  comment: string;
}) => {
  return (
    <ListItem>
      <ListItemContent>
        <HeaderStyle>
          <TitleStyle>{title}</TitleStyle>

          <ButtonsStyle>
            <ArrowForwardIcon />
            <ThumbUpIcon />
          </ButtonsStyle>
        </HeaderStyle>

        <ContentStyle>
          <Chip size="sm" color="info">
            {userName}
          </Chip>
          {comment}
        </ContentStyle>
      </ListItemContent>
    </ListItem>
  );
};

export { ReceivedComment };
