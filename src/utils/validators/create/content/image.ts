import { begin } from "../../validator.factory";

import * as Index from "../index";
import { Validator, validatorID } from "../../validator.type";

export const SIGNATURE = "validator.create.content.image";

export interface ImageContentData {
  link: string;
  description: string;
}

export type Data = Partial<ImageContentData>;

const ImageContent = begin<Data>()
  .filter(["link", "description"])
  .validate((data) => !!data.link && !!data.description, "이미지를 추가하세요.")
  .done();

const ImageValidator = (contentId: string, topId: string): Validator<Data> => ({
  validatorID: validatorID(SIGNATURE, contentId),
  signature: SIGNATURE,
  validators: { [ImageContent.name]: ImageContent },
  
  top: validatorID(Index.SIGNATURE, topId),
});

export default ImageValidator;
