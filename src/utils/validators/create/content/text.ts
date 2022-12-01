import { begin } from "../../validator.factory";

import * as Index from "../index";
import { DomainValidator, validatorID } from "../../validator.type";

const SIGNATURE = "validator.create.content.text";

const Messages = {
  TEXT_EMPTY: "글을 작성하세요.",
} as const;

interface Data {
  content?: string;
}

const TextContentValidator = (data: Data) =>
  begin(data)
    .validate((data) => !!data.content, Messages.TEXT_EMPTY)
    .done();

const Validator: (id: string, dependencyID: string) => DomainValidator<Data> = (
  id,
  dependencyID
) => ({
  signature: SIGNATURE,
  validators: [TextContentValidator],
  dependency: validatorID(Index.SIGNATURE, dependencyID),
  id,
});

export { Validator, type Data, SIGNATURE, Messages };
