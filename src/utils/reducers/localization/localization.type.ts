import { Language, LanguageType } from "../../../localization";

const L10NReducingType = {
    CHANGE_LANGUAGE: "reducer.localization.CHANGE_LANGUAGE",
    RESET_LANGUAGE: "reducer.localization.RESET_LANGUAGE",
} as const;

interface L10NStatus {
    language: Language;
}

const INITIAL_STATE: L10NStatus = {
    language: LanguageType.Korean,
};

export { type L10NStatus, INITIAL_STATE, L10NReducingType };