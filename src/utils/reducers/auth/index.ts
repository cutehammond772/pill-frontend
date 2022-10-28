import { Reducer } from "redux";
import { AuthState, AuthReducingAction, AuthReducingType, INITIAL_STATE, AuthReducingFunction } from "./reducer.auth.type";

const confirmAuthentication: AuthReducingFunction = () => ({
    type: AuthReducingType.AUTHENTICATE,
    payload: {
        authenticated: true,
    }
});

const confirmLogout: AuthReducingFunction = () => ({
    type: AuthReducingType.LOGOUT,
    payload: {
        authenticated: false,
    }
});

const authReducer: Reducer<AuthState, AuthReducingAction> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AuthReducingType.AUTHENTICATE:
          return {
            authenticated: action.payload.authenticated,
          };
        case AuthReducingType.LOGOUT:
          return {
            authenticated: action.payload.authenticated,
          };
        default:
          return state;
      }
};

export { confirmAuthentication, confirmLogout, authReducer };