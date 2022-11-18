const AuthReducingType = {
  AUTHENTICATE: "reducer.profile.AUTHENTICATE",
  LOGOUT_OR_FAIL: "reducer.profile.LOGOUT_OR_FAIL",
  REFRESH: "reducer.profile.REFRESH",
} as const;

const INITIAL_STATE: AuthenticationStatus = {
  loaded: false,
};

type AuthReducing = typeof AuthReducingType[keyof typeof AuthReducingType];

interface AuthenticationStatus {
  loaded: boolean;
  authenticated?: boolean;
}

interface AuthReducingAction {
  type: AuthReducing;
  payload: AuthenticationStatus;
}

export type { AuthenticationStatus, AuthReducingAction };
export { AuthReducingType, INITIAL_STATE };
