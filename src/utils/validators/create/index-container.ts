import { begin } from "../validator.factory";
import {
  Validator,
  validatorID,
  ValidatorQuantifiers,
} from "../validator.type";

import * as Pill from "./pill";
import * as Index from "./index";

export const SIGNATURE = "validator.create.index_container";

export interface IndexCountData {
  indexCount: number;
}

export type Data = Partial<IndexCountData>;

const DefaultValidator = begin<Data>()
  .filter(["indexCount"])
  .validate((data) => data.indexCount !== 0, "최소 하나의 인덱스가 필요합니다.")
  .done();

const IndexContainerValidator = (): Validator<Data> => ({
  validatorID: validatorID(SIGNATURE),
  signature: SIGNATURE,
  validators: { [DefaultValidator.name]: DefaultValidator },

  top: validatorID(Pill.SIGNATURE),
  subPattern: { patterns: { [Index.SIGNATURE]: ValidatorQuantifiers.EXIST } },
});

export default IndexContainerValidator;
