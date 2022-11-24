import { Reducer } from "redux";
import { Language } from "../../../localization";
import {
  INITIAL_STATE,
  L10NReducingType,
  L10NStatus,
} from "./localization.type";

const changeLanguage = (language: Language) => ({
  type: L10NReducingType.CHANGE_LANGUAGE,
  language,
});

const resetLanguage = () => ({
  type: L10NReducingType.RESET_LANGUAGE,
});

type L10NReducingAction =
  | ReturnType<typeof changeLanguage>
  | ReturnType<typeof resetLanguage>;

const localizationReducer: Reducer<L10NStatus, L10NReducingAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case L10NReducingType.CHANGE_LANGUAGE:
      return { ...state, language: action.language };
    case L10NReducingType.RESET_LANGUAGE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { localizationReducer, changeLanguage, resetLanguage };
