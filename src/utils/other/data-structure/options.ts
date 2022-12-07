export const CopyOptionSignatures = {
  COPY_NOTHING: "COPY_NOTHING",
  SWALLOW_COPY: "SWALLOW_COPY",
  DEEP_COPY: "DEEP_COPY",
} as const;

type CopyOptionSignature =
  typeof CopyOptionSignatures[keyof typeof CopyOptionSignatures];
type Copy<T extends CopyOptionSignature> = { type: T };

export type SwallowCopy = Copy<typeof CopyOptionSignatures.SWALLOW_COPY>;
export type CopyNothing = Copy<typeof CopyOptionSignatures.COPY_NOTHING>;
export type DeepCopy = Copy<typeof CopyOptionSignatures.DEEP_COPY> & {
  copyFn: <T>(element: T) => T;
};

export type CopyOption = SwallowCopy | CopyNothing | DeepCopy;

export type Filter<T> = (element: T) => boolean;

export const COPY_NOTHING: CopyNothing = { type: CopyOptionSignatures.COPY_NOTHING };