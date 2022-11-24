import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DEFUALT_LANGUAGE,
  L10NText,
  Language,
  LanguageType,
} from "../../../localization";
import ENGTexts from "../../../localization/eng";
import KORTexts from "../../../localization/kor";
import { RootState } from "../../reducers";

import * as reducer from "../../reducers/localization";

export const L10NMap = {
    [LanguageType.Korean]: KORTexts,
    [LanguageType.English]: ENGTexts,
} as const;

const useLocalization = () => {
  const language = useSelector((state: RootState) => state.l10n.language);
  const dispatch = useDispatch();

  const changeLanguage = useCallback(
    (language: Language) => dispatch(reducer.changeLanguage(language)),
    [dispatch]
  );

  const resetLanguage = useCallback(
    (language: Language) => dispatch(reducer.resetLanguage()),
    [dispatch]
  );

  const text = (message: L10NText) =>
    L10NMap[language][message] || L10NMap[DEFUALT_LANGUAGE][message];

  return { language, changeLanguage, resetLanguage, text };
};

export { useLocalization };
