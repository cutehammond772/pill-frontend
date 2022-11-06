import { PillContent } from "../../reducers/pill/pill.type";

const UpdateType = {
  PILL_TITLE: "update.PILL_TITLE",
  INDEX_TITLE: "update.INDEX_TITLE",
  INDEX_CONTENT: "update.INDEX_CONTENT",
} as const;

type Update = typeof UpdateType[keyof typeof UpdateType];

const AddType = {
  CATEGORY: "add.CATEGORY",
  INDEX: "add.INDEX",
  INDEX_CONTENT: "add.INDEX_CONTENT",
} as const;

type Add = typeof AddType[keyof typeof AddType];

const RemoveType = {
  CATEGORY: "remove.CATEGORY",
  INDEX: "remove.INDEX",
  INDEX_CONTENT: "remove.INDEX_CONTENT",
} as const;

type Remove = typeof RemoveType[keyof typeof RemoveType];

const UpdateOrderType = {
  CATEGORY: "update.order.CATEGORY",
  INDEX: "update.order.INDEX",
  INDEX_CONTENT: "update.order.INDEX_CONTENT",
} as const;

type UpdateOrder = typeof UpdateOrderType[keyof typeof UpdateOrderType];

const ResetType = {
  PILL: "reset.PILL",
  CATEGORY: "reset.CATEGORY",
} as const;

type Reset = typeof ResetType[keyof typeof ResetType];

const RollbackType = {
  INDEX: "rollback.INDEX",
  INDEX_CONTENT: "rollback.INDEX_CONTENT",
} as const;

type Rollback = typeof RollbackType[keyof typeof RollbackType];

interface ExtraProps {
  category?: string;

  index?: number;

  contentType?: PillContent;
  contentIndex?: number;
  content?: string;
  subContent?: string;

  title?: string;
}

export type { Update, Add, Remove, UpdateOrder, Rollback, Reset, ExtraProps };
export { UpdateType, AddType, RemoveType, UpdateOrderType, RollbackType, ResetType };
