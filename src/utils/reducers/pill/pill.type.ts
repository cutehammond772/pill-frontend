import { IndexContentProps } from "../../../pages/create/making/index/content/content.type";
import { ImageContent } from "../../../pages/create/making/index/content/image";
import { TextContent } from "../../../pages/create/making/index/content/text";

/* Pill */
const DefaultReducingType = {
  RESET: "reducer.pill.RESET",
  UPDATE_TITLE: "reducer.pill.UPDATE_TITLE",
} as const;

/* Category */
const CategoryReducingType = {
  ADD: "reducer.pill.category.ADD",
  RESET: "reducer.pill.category.RESET",
  REMOVE: "reducer.pill.category.REMOVE",
} as const;

/* Index */
const IndexReducingType = {
  ADD: "reducer.pill.index.ADD",
  UPDATE_TITLE: "reducer.pill.index.UPDATE_TITLE",
  REMOVE: "reducer.pill.index.REMOVE",
} as const;

/* Content */
const IndexContentReducingType = {
  ADD: "reducer.pill.index.content.ADD",
  UPDATE: "reducer.pill.index.content.UPDATE",
  REMOVE: "reducer.pill.index.content.REMOVE",
  EXCHANGE: "reducer.pill.index.content.EXCHANGE",
} as const;

/* Data */
interface PillData {
  title: string;
  categories: Array<CategoryData>;
  indexes: Array<PillIndexData>;
}

interface CategoryData {
  categoryId: string;
  category: string;
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

const PillContentTypeMapper: { [type in PillContent]: React.ComponentType<IndexContentProps> } = {
  [PillContentType.IMAGE]: ImageContent,
  [PillContentType.TEXT]: TextContent,
} as const;

/* Props */

interface PillContentProps {
  id: string;
  contentId: string;
}

interface AddCategoryProps {
  category: string;
}

interface RemoveCategoryProps {
  categoryId: string;
}

interface AddIndexContentProps {
  id: string;
  contentType: PillContent;
  content: string;
  subContent?: string;
}

interface UpdateIndexContentProps {
  id: string;
  contentId: string;
  content: string;
  subContent?: string;
}

interface RemoveIndexContentProps {
  id: string;
  contentId: string;
}

interface ExchangeIndexContentProps {
  id: string;
  contentId: string;
  exchangeId: string;
}

export type {
  PillData,
  CategoryData,
  PillIndexData,
  PillContent,
  PillContentData,

  PillContentProps,

  AddCategoryProps,
  RemoveCategoryProps,

  AddIndexContentProps,
  UpdateIndexContentProps,
  RemoveIndexContentProps,
  ExchangeIndexContentProps,
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
