import { begin } from "../validator.factory";
import {
  Validator,
  validatorID,
  ValidatorQuantifiers,
} from "../validator.type";

import * as IndexContainer from "./index-container";

import * as Text from "./content/text";
import * as Image from "./content/image";

export const SIGNATURE = "validator.create.index";

export interface TitleData {
  title: string;
}

export interface ContentData {
  contents: number;
}

export type Data = Partial<TitleData & ContentData>;

const TitleValidator = begin<Data>()
  .filter(["title"])
  .validate((data) => !!data.title?.trim(), "인덱스 제목을 입력해 주세요.")
  .done();

const ContentValidator = begin<Data>()
  .filter(["contents"])
  .validate((data) => data.contents !== 0, "인덱스 내용을 추가해 주세요.")
  .done();

const IndexValidator = (id: string): Validator<Data> => ({
  validatorID: validatorID(SIGNATURE, id),
  signature: SIGNATURE,
  validators: {
    title: TitleValidator,
    content: ContentValidator,
  },

  top: validatorID(IndexContainer.SIGNATURE),
  subPattern: {
    patterns: {
      ContentGroup: ValidatorQuantifiers.EXIST,
    },
    groups: {
      ContentGroup: [Text.SIGNATURE, Image.SIGNATURE],
    },
  },
});

export default IndexValidator;
