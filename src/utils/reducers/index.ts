import { combineReducers } from "redux";

import { authReducer } from "./auth";
import { headerReducer } from "./header";
import { onceReducer } from "./once";
import { pageReducer } from "./page";
import { pillReducer } from "./pill";
import { profileReducer } from "./profile";

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    pill: pillReducer,
    once: onceReducer,
    page: pageReducer,
    header: headerReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export { rootReducer, type RootState };