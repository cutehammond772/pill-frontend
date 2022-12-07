import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Language, LanguageType } from "../i18n";
import { identity } from "../other/identity";

export const REDUCER_NAME = "i18n";

export interface I18NState {
  language: Language;
}

const initialState: I18NState = {
  language: LanguageType.Korean,
};

// Reducer 요청
export const ReducerActionTypes = {
  CHANGE_LANGUAGE: `${REDUCER_NAME}/CHANGE_LANGUAGE`,
  RESET_LANGUAGE: `${REDUCER_NAME}/RESET_LANGUAGE`,
} as const;

// hook 또는 외부 로직에서의 요청
export const Actions = {
  changeLanguage: createAction<{ language: Language }>(
    ReducerActionTypes.CHANGE_LANGUAGE
  ),
  resetLanguage: createAction(ReducerActionTypes.RESET_LANGUAGE),
} as const;

const languageSelector = (state: RootState) => state.i18n.language;

export const StaticSelectors = {
  I18N_LANGUAGE: createSelector([languageSelector], identity),
} as const;

const i18nReducer = createReducer(initialState, {
  [ReducerActionTypes.CHANGE_LANGUAGE]: (
    state,
    action: ReturnType<typeof Actions.changeLanguage>
  ) => {
    state.language = action.payload.language;
  },

  [ReducerActionTypes.RESET_LANGUAGE]: (state) => {
    state.language = initialState.language;
  },
});

export default i18nReducer;
