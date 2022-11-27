import { Button, ListDivider } from "@mui/joy";

import * as Style from "./rc.style";
import { History } from "./rc.history";

import { ReceivedCommentData, ReceivedCommentsStats } from "./rc.type";
import { ReceivedComment } from "./rc.comment";

interface ReceivedCommentsProps {
  receivedComments?: Array<ReceivedCommentData>;
  stats?: ReceivedCommentsStats;
}

const ReceivedComments = (props: ReceivedCommentsProps) => {
  return (
    <Style.Container variant="soft" color="info">
      {!props.receivedComments ? (
        <></>
      ) : (
        <>
          {props.receivedComments.map((data) => (
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

      {!!props.receivedComments && !!props.stats && (
        <Style.Footer>
          <History unit={props.stats.timeUnit} comments={props.stats.commentsCount} />

          <Button size="sm" variant="solid" color="info">
            More...
          </Button>
        </Style.Footer>
      )}
    </Style.Container>
  );
};

export {
  ReceivedComments,
  type ReceivedCommentData,
  type ReceivedCommentsStats,
};
