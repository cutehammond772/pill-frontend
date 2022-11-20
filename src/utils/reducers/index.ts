import { combineReducers } from "redux";

import { authReducer } from "./auth";
import { headerReducer } from "./header";
import { pageReducer } from "./page";
import { pillReducer } from "./pill";
import { rollbackReducer } from "./pill/rollback";
import { profileReducer } from "./profile";
import { validationReducer } from "./validation";

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    pill: pillReducer,
    rollback: rollbackReducer,
    page: pageReducer,
    header: headerReducer,
    validation: validationReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export { rootReducer, type RootState };