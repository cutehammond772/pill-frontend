import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { profileReducer } from "./profile";

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer
});

type RootState = ReturnType<typeof rootReducer>;

export { rootReducer, type RootState };