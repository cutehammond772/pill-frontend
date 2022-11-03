import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { pillReducer } from "./pill";
import { profileReducer } from "./profile";

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    pill: pillReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export { rootReducer, type RootState };