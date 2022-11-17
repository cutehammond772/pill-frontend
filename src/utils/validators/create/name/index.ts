import { begin } from "../..";
import { PillData } from "../../../reducers/pill/pill.type";
import { DomainValidator } from "../../validator.type";

import * as Index from "../index";

const SIGNATURE = "validator.create.name";

const Messages = {
  TITLE_EMPTY: "title is empty",
  CATEGORY_EMPTY: "category is empty",
} as const;

const TitleValidator = (data: PillData) =>
  begin<PillData, typeof Messages>(data)
    .validate((data) => !data.title.trim(), Messages.TITLE_EMPTY)
    .done();

const CategoryValidator = (data: PillData) =>
  begin<PillData, typeof Messages>(data)
    .validate((data) => data.categories.length === 0, Messages.CATEGORY_EMPTY)
    .done();

const Validator: DomainValidator<PillData, typeof Messages> = {
  signature: SIGNATURE,
  validators: [TitleValidator, CategoryValidator],
  dependencies: [Index.SIGNATURE],
};

export { SIGNATURE, Validator, Messages };
