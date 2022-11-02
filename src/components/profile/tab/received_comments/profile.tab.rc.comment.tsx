import { ListItem, ListItemContent, Chip } from "@mui/joy";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  ReceivedCommentButtons,
  ReceivedCommentContent,
  ReceivedCommentHeader,
  ReceivedCommentTitle,
} from "./profile.tab.rc.style";

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
        <ReceivedCommentHeader>
          <ReceivedCommentTitle>{title}</ReceivedCommentTitle>

          <ReceivedCommentButtons>
            <ArrowForwardIcon />
            <ThumbUpIcon />
          </ReceivedCommentButtons>
        </ReceivedCommentHeader>

        <ReceivedCommentContent>
          <Chip size="sm" color="info">
            {userName}
          </Chip>
          {comment}
        </ReceivedCommentContent>
      </ListItemContent>
    </ListItem>
  );
};

export { ReceivedComment };
