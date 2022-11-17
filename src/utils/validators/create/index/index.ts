import { begin } from "../..";
import { IdProps, PillIndexData } from "../../../reducers/pill/pill.type";
import {
  DomainValidator,
} from "../../validator.type";

import * as Content from "../content";

const SIGNATURE = "validator.create.index";

const Messages = {
  TITLE_EMPTY: "title is empty",
  CONTENT_EMPTY: "content is empty",
} as const;

const TitleValidator = (data: PillIndexData) =>
  begin<PillIndexData, typeof Messages>(data)
    .validate((data) => !data.title, Messages.TITLE_EMPTY)
    .done();

const ContentValidator = (data: PillIndexData) =>
  begin<PillIndexData, typeof Messages>(data)
    .validate((data) => data.contents.length === 0, Messages.CONTENT_EMPTY)
    .done();

const Validator: (
  props: IdProps
) => DomainValidator<PillIndexData, typeof Messages> = (props) => ({
  signature: SIGNATURE,
  validators: [TitleValidator, ContentValidator],
  dependencies: [Content.SIGNATURE],
  ...props,
});

export { Validator, SIGNATURE, Messages };
