import { combineReducers } from "redux";

import authReducer from "./auth";
import headerReducer from "./header";
import i18nReducer from "./i18n";
import pageReducer from "./page/size";
import editorReducer from "./editor";
import rollbackReducer from "./rollback";
import profileReducer from "./profile";
import validationReducer from "./validation";
import pageTransitionReducer from "./page/transition";
import pageNavigateReducer from "./page/navigate";
import pageEventReducer from "./page/event";
import modalReducer from "./modal";

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
    pageNavigate: pageNavigateReducer,
    pageEvent: pageEventReducer,
    modal: modalReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export type { RootState };
export default rootReducer;