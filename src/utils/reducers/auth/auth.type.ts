const AuthReducingType = {
  AUTHENTICATE: "reducer.profile.authenticate",
  LOGOUT_OR_FAIL: "reducer.profile.logout",
  REFRESH: "reducer.profile.refresh",
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
