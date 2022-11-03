/* Pill */
const DefaultReducingType = {
  RESET: "reducer.pill.reset",
  UPDATE_TITLE: "reducer.pill.update.title",
} as const;

/* Category */
const CategoryReducingType = {
  ADD: "reducer.pill.category.add",
  REMOVE: "reducer.pill.category.remove",
  RESET: "reducer.pill.category.reset",
} as const;

/* Index */
const IndexReducingType = {
  ADD: "reducer.pill.index.add",
  UPDATE_TITLE: "reducer.pill.index.update.title",
  REMOVE: "reducer.pill.index.remove",

  // tbd
  ROLLBACK: "reducer.pill.index.rollback",
} as const;

/* Content */
const IndexContentReducingType = {
  ADD: "reducer.pill.index.content.add",
  UPDATE: "reducer.pill.index.content.update",
  REMOVE: "reducer.pill.index.content.remove",

  // tbd
  ROLLBACK: "reducer.pill.index.content.rollback",
} as const;

/* Data */
interface PillData {
  title: string;
  categories: Array<CategoryData>;
  indexes: Array<PillIndexData>;
}

interface CategoryData {
  name: string;
}

interface PillIndexData {
  title: string;
  contents: Array<PillContentData>;
  key: number;
}

interface PillContentData {
  type: PillContent;
  content: string;
  key: number;
}

const PillContentType = {
  IMAGE: "IMAGE",
  TEXT: "TEXT",
} as const;

type PillContent = typeof PillContentType[keyof typeof PillContentType];

export type {
  PillData,
  CategoryData,
  PillIndexData,
  PillContentData,
  PillContent,
};

export {
  DefaultReducingType,
  CategoryReducingType,
  IndexReducingType,
  IndexContentReducingType,
  PillContentType,
};
