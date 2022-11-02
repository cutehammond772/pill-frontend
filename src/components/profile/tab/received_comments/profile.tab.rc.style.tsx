import styled from "@emotion/styled";
import { List, ListItem } from "@mui/joy";

const ReceivedCommentsContent = styled(List)`
  min-width: 240;
  border-radius: sm;
  user-select: none;
`;

const ReceivedCommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
`;

const ReceivedCommentTitle = styled.span`
  font-family: Inter;
  font-weight: 700;
  font-size: 1rem;
`;

const ReceivedCommentButtons = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  align-items: center;
`;

const ReceivedCommentContent = styled.div`
  color: grey;
  font-family: Inter;
  font-size: 0.8rem;

  // Username Chip
  & > div:nth-of-type(1) {
    position: relative;
    left: -5px;
    font-size: 0.7rem;
  }
`;

const ReceivedCommentsHistoryContent = styled.div`
  display: flex;
  column-gap: 4px;
  align-items: center;
  color: gray;

  // text
  & > span {
    color: gray;
    font-family: Inter;
    font-size: 0.8rem;
  }
`;

const ReceivedCommentsFooter = styled(ListItem)`
  display: flex;
  justify-content: space-between;
`;

export {
  ReceivedCommentsContent,
  ReceivedCommentContent,
  ReceivedCommentHeader,
  ReceivedCommentTitle,
  ReceivedCommentButtons,
  ReceivedCommentsHistoryContent,
  ReceivedCommentsFooter,
};
