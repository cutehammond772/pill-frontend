interface PillData {
    title: string;
    categories: Array<CategoryData>;
    indexes: Array<PillIndexData>;
};

interface CategoryData {
  name: string;
};

interface PillIndexData {
    title: string;
    contents: Array<PillContentData>;
};

interface PillContentData {
    type: PillContentType;
    content: string;
};

const PillContentEnum = {
    IMAGE: "IMAGE",
    TEXT: "TEXT",
} as const;

type PillContentType = typeof PillContentEnum[keyof typeof PillContentEnum];

export type { PillData, CategoryData, PillIndexData, PillContentData };
export { PillContentEnum };
