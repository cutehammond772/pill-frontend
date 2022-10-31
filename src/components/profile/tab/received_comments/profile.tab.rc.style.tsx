import * as React from "react";
import styled from "@emotion/styled";
import { Chip, List, ListItem, Typography } from "@mui/joy";

const ReceivedCommentsContent = ({ children }: React.PropsWithChildren) => (
  <List
    variant="soft"
    color="info"
    sx={{
      minWidth: 240,
      borderRadius: "sm",
      userSelect: "none",
    }}
  >
    {children}
  </List>
);

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

const ReceivedCommentContent = ({
  userName,
  comment,
}: {
  userName: string;
  comment: string;
}) => {
  return (
    <Typography
      sx={{
        color: "grey",
        fontFamily: "Inter",
        fontSize: "0.8rem",
      }}
    >
      <Chip
        size="sm"
        color="info"
        sx={{
          left: "-5px",
          fontSize: "0.7rem",
        }}
      >
        {userName}
      </Chip>
      {comment}
    </Typography>
  );
};

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
