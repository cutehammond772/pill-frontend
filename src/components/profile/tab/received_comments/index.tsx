import { Button, ListDivider } from "@mui/joy";

import { ReceivedCommentsHistory } from "./profile.tab.rc.history";
import {
  ReceivedCommentsContent,
  ReceivedCommentsFooter,
} from "./profile.tab.rc.style";
import { ReceivedComment } from "./profile.tab.rc.comment";

interface ReceivedCommentData {
  title: string;
  userName: string;
  comment: string;
}

interface ReceivedCommentsStats {
  timeUnit: string;
  commentsCount: number;
}

const ReceivedComments = ({
  receivedComments,
  stats,
}: {
  receivedComments?: Array<ReceivedCommentData>;
  stats?: ReceivedCommentsStats;
}) => {
  return (
    <ReceivedCommentsContent>
      {!receivedComments ? (
        <></>
      ) : (
        <>
          {receivedComments.map((data, index) => (
            <>
              {index !== 0 && <ListDivider inset="gutter" />}
              <ReceivedComment
                title={data.title}
                userName={data.userName}
                comment={data.comment}
                key={index}
              />
            </>
          ))}
        </>
      )}

      {!!receivedComments && !!stats && (
        <ReceivedCommentsFooter>
          <ReceivedCommentsHistory unit={stats.timeUnit} comments={stats.commentsCount} />

          <Button size="sm" variant="solid" color="info">
            More...
          </Button>
        </ReceivedCommentsFooter>
      )}
    </ReceivedCommentsContent>
  );
};

export { ReceivedComments, type ReceivedCommentData, type ReceivedCommentsStats };
