import { begin } from "../validator.factory";
import { DomainValidator, validatorID } from "../validator.type";

import * as IndexContainer from "./index-container";

const SIGNATURE = "validator.create.index";

const Messages = {
  TITLE_EMPTY: "인덱스 제목을 입력해 주세요.",
  CONTENT_EMPTY: "인덱스 내용을 입력해 주세요.",
} as const;

interface Data {
  title: string;
  contentsSize: number;
}

const DefaultValidator = (data: Data) =>
  begin<Data, typeof Messages>(data)
    .validate((data) => !!data.title, Messages.TITLE_EMPTY)
    .validate((data) => data.contentsSize !== 0, Messages.CONTENT_EMPTY)
    .done();

const Validator: (id: string) => DomainValidator<Data, typeof Messages> = (id) => ({
  signature: SIGNATURE,
  validators: [DefaultValidator],
  minDependencies: 1,
  dependency: validatorID(IndexContainer.SIGNATURE),
  id,
});

export { Validator, type Data, SIGNATURE, Messages };
