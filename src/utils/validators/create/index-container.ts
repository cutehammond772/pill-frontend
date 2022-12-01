import { begin } from "../validator.factory";
import { DomainValidator, validatorID } from "../validator.type";

import * as Pill from "./pill";

const SIGNATURE = "validator.create.index_container";

const Messages = {
  INDEX_EMPTY: "최소 하나의 인덱스가 필요합니다.",
} as const;

interface Data {
  indexSize: number;
}

const DefaultValidator = (data: Data) =>
  begin<Data>(data)
    .validate((data) => data.indexSize !== 0, Messages.INDEX_EMPTY)
    .done();

const Validator: DomainValidator<Data> = {
  signature: SIGNATURE,
  validators: [DefaultValidator],
  minDependencies: 1,
  dependency: validatorID(Pill.SIGNATURE),
};

export { Validator, type Data, SIGNATURE, Messages };
