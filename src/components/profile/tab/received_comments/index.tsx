import { Button, ListDivider } from "@mui/joy";

import { History } from "./rc.history";
import { ContainerStyle, FooterStyle } from "./rc.style";

import { ReceivedCommentData, ReceivedCommentsStats } from "./rc.type";

import { ReceivedComment } from "./rc.comment";

const ReceivedComments = ({
  receivedComments,
  stats,
}: {
  receivedComments?: Array<ReceivedCommentData>;
  stats?: ReceivedCommentsStats;
}) => {
  return (
    <ContainerStyle variant="soft" color="info">
      {!receivedComments ? (
        <></>
      ) : (
        <>
          {receivedComments.map((data) => (
            <div key={data.key}>
              {data.key !== 0 && <ListDivider inset="gutter" />}
              <ReceivedComment
                title={data.title}
                userName={data.userName}
                comment={data.comment}
              />
            </div>
          ))}
        </>
      )}

      {!!receivedComments && !!stats && (
        <FooterStyle>
          <History unit={stats.timeUnit} comments={stats.commentsCount} />

          <Button size="sm" variant="solid" color="info">
            More...
          </Button>
        </FooterStyle>
      )}
    </ContainerStyle>
  );
};

export {
  ReceivedComments,
  type ReceivedCommentData,
  type ReceivedCommentsStats,
};
