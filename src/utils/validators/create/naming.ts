import { begin } from "../validator.factory";
import { DomainValidator, validatorID } from "../validator.type";

import * as Pill from "./pill";

const SIGNATURE = "validator.create.name";

const Messages = {
  TITLE_EMPTY: "Pill 제목을 입력해 주세요.",
  CATEGORY_EMPTY: "Pill 카테고리를 하나 이상 추가해야 합니다.",
} as const;

interface Data {
  title: string;
  categoriesSize: number;
}

// 수정*
const DefaultValidator = (data: Data) =>
  begin<Data>(data)
    .validate((data) => !!data.title.trim(), Messages.TITLE_EMPTY)
    .validate((data) => data.categoriesSize !== 0, Messages.CATEGORY_EMPTY)
    .done();

const Validator: DomainValidator<Data> = {
  signature: SIGNATURE,
  validators: [DefaultValidator],
  dependency: validatorID(Pill.SIGNATURE),
};

export { SIGNATURE, type Data, Validator, Messages };
