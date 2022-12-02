import { combineReducers } from "redux";

import authReducer from "./auth";
import headerReducer from "./header";
import i18nReducer from "./i18n";
import pageReducer from "./page";
import editorReducer from "./editor";
import rollbackReducer from "./rollback";
import profileReducer from "./profile";
import validationReducer from "./validation";
import pageTransitionReducer from "./page-transition";

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    editor: editorReducer,
    rollback: rollbackReducer,
    page: pageReducer,
    header: headerReducer,
    validation: validationReducer,
    i18n: i18nReducer,
    pageTransition: pageTransitionReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export type { RootState };
export default rootReducer;