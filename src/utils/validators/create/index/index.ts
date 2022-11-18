import { begin } from "../../validator.factory";
import { DomainIdValidator } from "../../validator.type";

import * as Content from "../content";

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

const Validator: DomainIdValidator<Data, typeof Messages> = (props) => ({
  signature: SIGNATURE,
  validators: [DefaultValidator],
  dependencies: [Content.SIGNATURE],
  ...props,
});

export { Validator, type Data, SIGNATURE, Messages };
