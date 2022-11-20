import { DomainValidator } from "../../validator.type";

const SIGNATURE = "validator.create.pill";

const Validator: DomainValidator<{}, {}> = ({
  signature: SIGNATURE,
  validators: [],
  minDependencies: 2,
});

export { Validator, SIGNATURE };