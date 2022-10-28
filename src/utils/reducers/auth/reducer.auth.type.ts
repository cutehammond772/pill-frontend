const AuthReducingType = {
  AUTHENTICATE: "reducer.profile.authenticate",
  LOGOUT: "reducer.profile.logout",
} as const;

const INITIAL_STATE: AuthState = {
  authenticated: false,
};

type AuthReducing = typeof AuthReducingType[keyof typeof AuthReducingType];

interface AuthState {
  authenticated: boolean;
}

interface AuthReducingAction {
    type: AuthReducing;
    payload: AuthState;
}

interface AuthReducingFunction {
    (): AuthReducingAction
}

export type { AuthState, AuthReducingAction, AuthReducingFunction };
export { AuthReducingType, INITIAL_STATE };
