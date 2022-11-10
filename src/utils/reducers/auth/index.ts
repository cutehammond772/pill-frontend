import { Reducer } from "redux";
import {
  AuthenticationStatus,
  AuthReducingType,
  INITIAL_STATE,
} from "./auth.type";

const confirmAuth = () => ({
  type: AuthReducingType.AUTHENTICATE,
  payload: {
    loaded: true,
    authenticated: true,
  },
});

const confirmUnauth = () => ({
  type: AuthReducingType.LOGOUT_OR_FAIL,
  payload: {
    loaded: true,
    authenticated: false,
  },
});

const refreshAuth = () => ({
  type: AuthReducingType.REFRESH,
});

type AuthReducingAction =
  | ReturnType<typeof confirmAuth>
  | ReturnType<typeof confirmUnauth>
  | ReturnType<typeof refreshAuth>;

const authReducer: Reducer<AuthenticationStatus, AuthReducingAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AuthReducingType.AUTHENTICATE:
      return {
        ...state,
        loaded: action.payload.loaded,
        authenticated: action.payload.authenticated,
      };
    case AuthReducingType.LOGOUT_OR_FAIL:
      return {
        ...state,
        loaded: action.payload.loaded,
        authenticated: action.payload.authenticated,
      };
    case AuthReducingType.REFRESH:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { confirmAuth, confirmUnauth, refreshAuth, authReducer };
