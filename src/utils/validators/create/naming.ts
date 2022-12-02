import { begin } from "../validator.factory";
import { Validator, validatorID } from "../validator.type";

import * as Pill from "./pill";

export const SIGNATURE = "validator.create.name";

export interface TitleData {
  title: string;
}

export interface CategoryData {
  categories: number;
}

export type Data = Partial<TitleData & CategoryData>;

const TitleValidator = begin<Data>()
  .filter(["title"])
  .validate((data) => !!data.title?.trim(), "Pill 제목을 입력해 주세요.")
  .done();

const CategoryValidator = begin<Data>()
  .filter(["categories"])
  .validate(
    (data) => data.categories !== 0,
    "Pill 카테고리를 하나 이상 추가해야 합니다."
  )
  .done();

const NamingValidator = (): Validator<Data> => ({
  validatorID: validatorID(SIGNATURE),
  signature: SIGNATURE,
  validators: {
    [TitleValidator.name]: TitleValidator,
    [CategoryValidator.name]: CategoryValidator,
  },

  top: validatorID(Pill.SIGNATURE),
});

export default NamingValidator;
