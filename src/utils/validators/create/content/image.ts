import { begin } from "../../validator.factory";

import * as Index from "../index";
import { DomainValidator, validatorID } from "../../validator.type";

const SIGNATURE = "validator.create.content.image";

const Messages = {
  IMAGE_EMPTY: "이미지를 추가하세요.",
} as const;

interface Data {
  link?: string;
  description?: string;
}

const ImageContentValidator = (data: Data) =>
  begin(data)
    .validate((data) => !!data.link && !!data.description, Messages.IMAGE_EMPTY)
    .done();

const Validator: (id: string, dependencyID: string) => DomainValidator<Data> = (
  id,
  dependencyID
) => ({
  signature: SIGNATURE,
  validators: [ImageContentValidator],
  dependency: validatorID(Index.SIGNATURE, dependencyID),
  id,
});

export { Validator, type Data, SIGNATURE, Messages };
