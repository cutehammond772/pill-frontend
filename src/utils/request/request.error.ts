const ERequestError = {
    ERR_NETWORK: 'ERR_NETWORK',
    ERR_BAD_REQUEST: 'ERR_BAD_REQUEST',
    EMPTY: 'EMPTY',
    SUCCESS: 'SUCCESS',
    UNKNOWN: 'UNKNOWN'
} as const;

type TRequestError = typeof ERequestError[keyof typeof ERequestError];

const resolve = (error: TRequestError, subject: string) => {
    switch (error) {
        case ERequestError.ERR_NETWORK:
            console.log(`[${subject}] Cannot fetch Access Token: failed to connect with Back-end Server.`);
            break;
        case ERequestError.ERR_BAD_REQUEST:
            // 404 Not Found
            console.log(`[${subject}] Cannot fetch Access Token: cannot find Refresh Token (need to login.)`);
            break;
        case ERequestError.EMPTY:
            // Token is empty
            console.log(`[${subject}] Cannot fetch Access Token: token is empty.`);
            break;
        case ERequestError.SUCCESS:
            console.log(`[${subject}] Fetched Access Token successfully.`);
            break;
        default:
            console.log(`[${subject}] Cannot fetch Access Token: unknown issue.`);
            break;
    }
};

const convert = (error: string) => {
    switch(error) {
        case ERequestError.ERR_NETWORK:
            return ERequestError.ERR_NETWORK;
        case ERequestError.ERR_BAD_REQUEST:
            return ERequestError.ERR_BAD_REQUEST;
        default:
            return ERequestError.UNKNOWN;
    }
};

export { convert, resolve, ERequestError as Type };