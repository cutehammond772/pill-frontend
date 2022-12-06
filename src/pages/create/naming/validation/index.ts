import { I18N } from "../../../../utils/i18n";

export const validateCategory = (value: string) => {
  if (value.trim() !== value) {
    return I18N.PAGE_CREATE_34;
  }

  if (!!value && !value.match("^(([a-zA-Z]+)|([ㅏ-ㅣㄱ-ㅎ가-힣]+))$")) {
    return I18N.PAGE_CREATE_35;
  }

  if (value.length > 10) {
    return I18N.PAGE_CREATE_36;
  }

  return null;
};

export const validateTitle = (value: string) => {
  if (value.length > 30) {
    return I18N.PAGE_CREATE_38;
  }

  return null;
};
