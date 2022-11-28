export interface ReceivedCommentData {
  title: string;
  userName: string;
  comment: string;
  key: number;
};

export interface ReceivedCommentsStats {
  timeUnit: string;
  commentsCount: number;
};