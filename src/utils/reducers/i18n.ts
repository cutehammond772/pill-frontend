import { createAction, createReducer } from "@reduxjs/toolkit";
import { Language, LanguageType } from "../i18n";

export const REDUCER_NAME = "i18n";

export interface I18NState {
  language: Language;
}

const initialState: I18NState = {
  language: LanguageType.Korean,
};

export const ActionTypes = {
  CHANGE_LANGUAGE: `${REDUCER_NAME}/CHANGE_LANGUAGE`,
  RESET_LANGUAGE: `${REDUCER_NAME}/RESET_LANGUAGE`,
} as const;

export const Actions = {
  // For Reducer  
  changeLanguage: createAction<{ language: Language }>(
    ActionTypes.CHANGE_LANGUAGE
  ),
  resetLanguage: createAction(ActionTypes.RESET_LANGUAGE),
} as const;

const i18nReducer = createReducer(initialState, {
  [ActionTypes.CHANGE_LANGUAGE]: (
    state,
    action: ReturnType<typeof Actions.changeLanguage>
  ) => {
    state.language = action.payload.language;
  },

  [ActionTypes.RESET_LANGUAGE]: (state) => {
    state.language = initialState.language;
  },
});

export default i18nReducer;
