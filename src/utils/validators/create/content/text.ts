import { begin } from "../../validator.factory";

import * as Index from "../index";
import { Validator, validatorID } from "../../validator.type";

export const SIGNATURE = "validator.create.content.text";

export interface TextContentData {
  content: string;
}

export type Data = Partial<TextContentData>;

const TextContent = begin<Data>()
  .filter(["content"])
  .validate((data) => !!data.content, "글을 작성하세요.")
  .done();

const TextValidator = (contentId: string, topId: string): Validator<Data> => ({
  validatorID: validatorID(SIGNATURE, contentId),
  signature: SIGNATURE,
  validators: { text: TextContent },
  top: validatorID(Index.SIGNATURE, topId),
});

export default TextValidator;