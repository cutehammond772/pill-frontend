import { begin } from "../../validator.factory";
import {
  PillContent,
  PillContentType,
} from "../../../reducers/pill/pill.type";

import { DomainIdValidator } from "../../validator.type";

const SIGNATURE = "validator.create.content";

const Messages = {
  IMAGE_EMPTY: "'이미지' 내용 중 빈 칸이 있습니다.",
  TEXT_EMPTY: "'글' 내용 중에 빈 칸이 있습니다.",
} as const;

interface Data {
  type: PillContent;
  content: string;
  subContent?: string;
}

const ImageContentValidator = (data: Data) =>
  begin<Data, typeof Messages>(data)
    .pass((data) => data.type !== PillContentType.IMAGE)
    .validate((data) => !!data.content && !!data.subContent, Messages.IMAGE_EMPTY)
    .done();

const TextContentValidator = (data: Data) =>
  begin<Data, typeof Messages>(data)
    .pass((data) => data.type !== PillContentType.TEXT)
    .validate((data) => !!data.content, Messages.TEXT_EMPTY)
    .done();

const Validator: DomainIdValidator<Data, typeof Messages> = (props) => ({
  signature: SIGNATURE,
  validators: [ImageContentValidator, TextContentValidator],
  dependencies: [],
  ...props,
});

export { Validator, type Data, SIGNATURE, Messages };
