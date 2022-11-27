import { begin } from "../validator.factory";
import { DomainValidator } from "../validator.type";

const SIGNATURE = "validator.create.pill";

// 항상 'VALID'하다.
const DefaultValidator = () => begin<{}, {}>({}).done();

const Validator: DomainValidator<{}, {}> = {
  signature: SIGNATURE,
  validators: [DefaultValidator],

  // IndexContainer, Naming
  minDependencies: 2,
};

export { Validator, SIGNATURE };
