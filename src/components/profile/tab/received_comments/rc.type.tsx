interface ReceivedCommentData {
  title: string;
  userName: string;
  comment: string;
  key: number;
}

interface ReceivedCommentsStats {
  timeUnit: string;
  commentsCount: number;
}

export type { ReceivedCommentData, ReceivedCommentsStats };