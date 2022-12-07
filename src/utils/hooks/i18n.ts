import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DEFUALT_LANGUAGE,
  I18NText,
  I18NTextFunction,
  Language,
  LanguageType,
} from "../i18n";
import ENGTexts from "../i18n/eng";
import KORTexts from "../i18n/kor";

import { Actions as actions, StaticSelectors as selectors } from "../reducers/i18n";

// 각 LanguageType 당 언어 데이터를 매핑한 데이터이다.
export const I18NMap = {
  [LanguageType.Korean]: KORTexts,
  [LanguageType.English]: ENGTexts,
} as const;

// 특정 언어 설정에 따라 텍스트를 달리 하기 위해 사용한다.
export const useI18n = () => {
  const language = useSelector(selectors.I18N_LANGUAGE);
  const dispatch = useDispatch();

  // 언어를 변경한다.
  const changeLanguage = useCallback(
    (language: Language) => dispatch(actions.changeLanguage({ language })),
    [dispatch]
  );

  // 기본 언어 (= 한국어)로 설정한다.
  const resetLanguage = useCallback(
    () => dispatch(actions.resetLanguage()),
    [dispatch]
  );

  // 현재 설정된 언어에 따른 텍스트를 반환한다.
  // 만약 대응되는 텍스트가 해당 언어에 존재하지 않으면 기본 언어에서 가져온다.
  const text: I18NTextFunction = useCallback(
    (message: I18NText) =>
    I18NMap[language][message] || I18NMap[DEFUALT_LANGUAGE][message],
    [language]
  );
  return { language, changeLanguage, resetLanguage, text };
};
