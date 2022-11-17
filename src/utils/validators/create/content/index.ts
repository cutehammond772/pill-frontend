import { begin } from "../..";
import {
  IdProps,
  PillContentData,
  PillContentType,
} from "../../../reducers/pill/pill.type";

import { DomainValidator } from "../../validator.type";

const SIGNATURE = "validator.create.content";

const Messages = {
  IMAGE_EMPTY: "some image content is empty",
  TEXT_EMPTY: "some text content is empty",
} as const;

const ImageContentValidator = (data: PillContentData) =>
  begin<PillContentData, typeof Messages>(data)
    .pass((data) => data.type !== PillContentType.IMAGE)
    .validate((data) => !data.content || !data.subContent, Messages.IMAGE_EMPTY)
    .done();

const TextContentValidator = (data: PillContentData) =>
  begin<PillContentData, typeof Messages>(data)
    .pass((data) => data.type !== PillContentType.TEXT)
    .validate((data) => !data.content, Messages.TEXT_EMPTY)
    .done();

const Validator: (
  props: IdProps
) => DomainValidator<PillContentData, typeof Messages> = (props) => ({
  signature: SIGNATURE,
  validators: [ImageContentValidator, TextContentValidator],
  dependencies: [],
  ...props,
});

export { Validator, SIGNATURE, Messages };
