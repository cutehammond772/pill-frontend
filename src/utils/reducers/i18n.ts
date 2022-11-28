import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Language, LanguageType } from "../../i18n";

interface I18NState {
    language: Language;
}

const REDUCER_NAME = "i18n";
const initialState: I18NState = {
    language: LanguageType.Korean,
}

const i18nSlice = createSlice({
    name: REDUCER_NAME,
    initialState,
    reducers: {
        changeLanguage: (state, action: PayloadAction<{ language: Language }>) => {
            state.language = action.payload.language;
        },
        
        resetLanguage: (state) => {
            state.language = initialState.language;
        }
    },
});

export const { changeLanguage, resetLanguage } = i18nSlice.actions;
export { REDUCER_NAME, type I18NState };
export default i18nSlice.reducer;