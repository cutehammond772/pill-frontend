const AuthErrorType = {
    ERR_NETWORK: 'ERR_NETWORK',
    ERR_BAD_REQUEST: 'ERR_BAD_REQUEST',
    EMPTY: 'EMPTY',
    SUCCESS: 'SUCCESS',
    UNKNOWN: 'UNKNOWN'
} as const;

type AuthError = typeof AuthErrorType[keyof typeof AuthErrorType];

const resolve = (error: AuthError) => {
    switch (error) {
        case AuthErrorType.ERR_NETWORK:
            console.log("[Auth] Cannot fetch access token: failed to connect with Back-end Server.");
            break;
        case AuthErrorType.ERR_BAD_REQUEST:
            // 404 Not Found
            console.log("[Auth] Cannot fetch access token: cannot find Refresh Token (need to login.)");
            break;
        case AuthErrorType.EMPTY:
            // Token is empty
            console.log("[Auth] Cannot fetch access token: token is empty.");
            break;
        case AuthErrorType.SUCCESS:
            console.log("[Auth] Fetched access token successfully.");
            break;
        default:
            console.log("[Auth] Cannot fetch access token: unknown issue.");
            break;
    }
};

const convert = (error: string) => {
    switch(error) {
        case AuthErrorType.ERR_NETWORK:
            return AuthErrorType.ERR_NETWORK;
        case AuthErrorType.ERR_BAD_REQUEST:
            return AuthErrorType.ERR_BAD_REQUEST;
        default:
            return AuthErrorType.UNKNOWN;
    }
};

export { convert, resolve, AuthErrorType as Type };