import {
  Validator,
  validatorID,
  ValidatorQuantifiers,
} from "../validator.type";

import * as IndexContainer from "./index-container";
import * as Naming from "./naming";

export const SIGNATURE = "validator.create.pill";

const PillValidator = (): Validator<{}> => ({
  validatorID: validatorID(SIGNATURE),
  signature: SIGNATURE,
  validators: {},

  subPattern: {
    patterns: {
      [IndexContainer.SIGNATURE]: ValidatorQuantifiers.ONE,
      [Naming.SIGNATURE]: ValidatorQuantifiers.ONE,
    },
  },
});

export default PillValidator;
