import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Language, LanguageType } from "../../localization";

interface L10NState {
    language: Language;
}

const REDUCER_NAME = "l10n";
const initialState: L10NState = {
    language: LanguageType.Korean,
}

const l10nSlice = createSlice({
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

export const { changeLanguage, resetLanguage } = l10nSlice.actions;
export { REDUCER_NAME, type L10NState };
export default l10nSlice.reducer;