import { IndexContentProps } from "../../pages/create/making/index/content/content.type";
import { ImageContent } from "../../pages/create/making/index/content/image";
import { TextContent } from "../../pages/create/making/index/content/text";

export const PillContentType = {
  IMAGE: "Image",
  TEXT: "Text",
} as const;

export type PillContent = typeof PillContentType[keyof typeof PillContentType];

export const PillContentMapper = (type: PillContent): React.ComponentType<IndexContentProps> => {
  switch (type) {
    case PillContentType.IMAGE:
      return ImageContent;

    case PillContentType.TEXT:
      return TextContent;
      
    default:
      throw new Error("[PillContentMapper] 유효하지 않은 PillContent입니다.");
  }
};

export interface CategoryData {
  categoryId: string;
  category: string;
}

export interface PillIndexData {
  id: string;
  title: string;
  contents: Array<PillContentData>;
}

export interface PillContentData {
  contentId: string;
  type: PillContent;
  content: string;
  subContent: string;
}
