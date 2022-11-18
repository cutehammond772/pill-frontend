import { begin } from "../../validator.factory";
import { DomainValidator } from "../../validator.type";

const SIGNATURE = "validator.create.name";

const Messages = {
  TITLE_EMPTY: "Pill 제목을 입력해 주세요.",
  CATEGORY_EMPTY: "Pill 카테고리를 하나 이상 추가해야 합니다.",
} as const;

interface Data {
  title: string;
  categoriesSize: number;
}

const DefaultValidator = (data: Data) =>
  begin<Data, typeof Messages>(data)
    .validate((data) => !!data.title.trim(), Messages.TITLE_EMPTY)
    .validate((data) => data.categoriesSize !== 0, Messages.CATEGORY_EMPTY)
    .done();

const Validator: DomainValidator<Data, typeof Messages> = {
  signature: SIGNATURE,
  validators: [DefaultValidator],
  dependencies: [],
};

export { SIGNATURE, type Data, Validator, Messages };
