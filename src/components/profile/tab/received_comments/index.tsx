import { Button, ListDivider } from "@mui/joy";

import { ReceivedCommentsHistory } from "./profile.tab.rc.history";
import {
  ReceivedCommentsContent,
  ReceivedCommentsFooter,
} from "./profile.tab.rc.style";

import {
  ReceivedCommentData,
  ReceivedCommentsStats,
} from "./profile.tab.rc.type";

import { ReceivedComment } from "./profile.tab.rc.comment";

const ReceivedComments = ({
  receivedComments,
  stats,
}: {
  receivedComments?: Array<ReceivedCommentData>;
  stats?: ReceivedCommentsStats;
}) => {
  return (
    <ReceivedCommentsContent variant="soft" color="info">
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
        <ReceivedCommentsFooter>
          <ReceivedCommentsHistory
            unit={stats.timeUnit}
            comments={stats.commentsCount}
          />

          <Button size="sm" variant="solid" color="info">
            More...
          </Button>
        </ReceivedCommentsFooter>
      )}
    </ReceivedCommentsContent>
  );
};

export {
  ReceivedComments,
  type ReceivedCommentData,
  type ReceivedCommentsStats,
};
