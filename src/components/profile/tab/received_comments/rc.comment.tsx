import { ListItem, ListItemContent } from "@mui/joy";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import * as Style from "./rc.style";

interface ReceivedCommentProps {
  title: string;
  userName: string;
  comment: string;
}

const ReceivedComment = (props: ReceivedCommentProps) => {
  return (
    <ListItem>
      <ListItemContent>
        <Style.Header>
          <Style.Title>{props.title}</Style.Title>

          <Style.Buttons>
            <ArrowForwardIcon />
            <ThumbUpIcon />
          </Style.Buttons>
        </Style.Header>

        <Style.Content>
          <span className="user">{props.userName}</span>
          {props.comment}
        </Style.Content>
      </ListItemContent>
    </ListItem>
  );
};

export { ReceivedComment };
