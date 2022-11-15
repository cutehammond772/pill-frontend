import { ImageContent } from "../../../pages/create/making/index/content/image";
import { TextContent } from "../../../pages/create/making/index/content/text";

/* Pill */
const DefaultReducingType = {
  RESET: "reducer.pill.reset",
  UPDATE_TITLE: "reducer.pill.update.title",
} as const;

/* Category */
const CategoryReducingType = {
  ADD: "reducer.pill.category.add",
  RESET: "reducer.pill.category.reset",
  REMOVE: "reducer.pill.category.remove",
} as const;

/* Index */
const IndexReducingType = {
  ADD: "reducer.pill.index.add",
  UPDATE_TITLE: "reducer.pill.index.update.title",
  REMOVE: "reducer.pill.index.remove",
} as const;

/* Content */
const IndexContentReducingType = {
  ADD: "reducer.pill.index.content.add",
  UPDATE: "reducer.pill.index.content.update",
  REMOVE: "reducer.pill.index.content.remove",
  EXCHANGE: "reducer.pill.index.content.exchange",
} as const;

/* Data */
interface PillData {
  title: string;
  categories: Array<CategoryData>;
  indexes: Array<PillIndexData>;
}

interface CategoryData {
  id: string;
  name: string;
}

interface PillIndexData {
  id: string;
  title: string;
  contents: Array<PillContentData>;
}

interface PillContentData {
  contentId: string;
  type: PillContent;
  content: string;
  subContent: string;
}

const INITIAL_STATE: PillData = {
  title: "",
  categories: [],
  indexes: [],
};

/* Types */
const PillContentType = {
  IMAGE: "Image",
  TEXT: "Text",
} as const;

type PillContent = typeof PillContentType[keyof typeof PillContentType];

const PillContentTypeMapper: { [type in PillContent]: React.ComponentType<ContentProps> } = {
  [PillContentType.IMAGE]: ImageContent,
  [PillContentType.TEXT]: TextContent,
} as const;

/* Props */
interface RequestProps {
  id: string;
  category: string;
  title: string;

  contentType: PillContent;
  contentId: string;
  exchangeId: string;

  content: string;
  subContent: string;
}

type IdProps = Pick<RequestProps, "id">;
type ContentProps = Pick<RequestProps, "id" | "contentId">;
type TitleProps = Pick<RequestProps, "title">;
type CategoryProps = Pick<RequestProps, "category">;

type AddIndexContentProps = Pick<RequestProps, "id" | "contentType"> &
  Partial<Pick<RequestProps, "content" | "subContent">>;

type UpdateIndexContentProps = Pick<RequestProps, "id" | "contentId"> &
  Partial<Pick<RequestProps, "content" | "subContent">>;

type RemoveIndexContentProps = Pick<RequestProps, "id" | "contentId">;

type ExchangeIndexContentProps = Pick<
  RequestProps,
  "id" | "contentId" | "exchangeId"
>;

export type {
  PillData,
  CategoryData,
  PillIndexData,
  PillContentData,

  RequestProps,
  IdProps,
  TitleProps,
  CategoryProps,

  AddIndexContentProps,
  UpdateIndexContentProps,
  RemoveIndexContentProps,
  ExchangeIndexContentProps,
  ContentProps,
};

export {
  DefaultReducingType,
  CategoryReducingType,
  IndexReducingType,
  IndexContentReducingType,

  PillContentType,
  PillContentTypeMapper,

  INITIAL_STATE,
};
