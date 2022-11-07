import { ListItem, ListItemContent, Chip } from "@mui/joy";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  ButtonsStyle,
  ContentStyle,
  HeaderStyle,
  TitleStyle,
} from "./rc.style";

interface ReceivedCommentProps {
  title: string;
  userName: string;
  comment: string;
}

const ReceivedComment = (props: ReceivedCommentProps) => {
  return (
    <ListItem>
      <ListItemContent>
        <HeaderStyle>
          <TitleStyle>{props.title}</TitleStyle>

          <ButtonsStyle>
            <ArrowForwardIcon />
            <ThumbUpIcon />
          </ButtonsStyle>
        </HeaderStyle>

        <ContentStyle>
          <Chip size="sm" color="info">
            {props.userName}
          </Chip>
          {props.comment}
        </ContentStyle>
      </ListItemContent>
    </ListItem>
  );
};

export { ReceivedComment };
