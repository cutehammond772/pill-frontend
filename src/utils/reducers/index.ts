import { combineReducers } from "redux";

import authReducer from "./auth";
import headerReducer from "./header";
import l10nReducer from "./l10n";
import pageReducer from "./page";
import creatorReducer from "./creator";
import rollbackReducer from "./rollback";
import profileReducer from "./profile";
import runOnceReducer from "./run-once";
import validationReducer from "./validation";

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    creator: creatorReducer,
    rollback: rollbackReducer,
    page: pageReducer,
    header: headerReducer,
    validation: validationReducer,
    runOnce: runOnceReducer,
    l10n: l10nReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export type { RootState };
export default rootReducer;