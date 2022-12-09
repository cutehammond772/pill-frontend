
export const CopyOptions = {
  COPY_NOTHING: "COPY_NOTHING",
  SWALLOW_COPY: "SWALLOW_COPY",
} as const;

export type CopyOption = typeof CopyOptions[keyof typeof CopyOptions];
export type Filter<T> = (element: T) => boolean;