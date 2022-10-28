const RequestErrorType = {
    ERR_NETWORK: 'ERR_NETWORK',
    ERR_BAD_REQUEST: 'ERR_BAD_REQUEST',
    EMPTY: 'EMPTY',
    SUCCESS: 'SUCCESS',
    UNKNOWN: 'UNKNOWN'
} as const;

type RequestError = typeof RequestErrorType[keyof typeof RequestErrorType];

const resolve = (error: RequestError, subject: string) => {
    switch (error) {
        case RequestErrorType.ERR_NETWORK:
            console.log(`[${subject}] Cannot fetch Access Token: failed to connect with Back-end Server.`);
            break;
        case RequestErrorType.ERR_BAD_REQUEST:
            // 404 Not Found
            console.log(`[${subject}] Cannot fetch Access Token: cannot find Refresh Token (need to login.)`);
            break;
        case RequestErrorType.EMPTY:
            // Token is empty
            console.log(`[${subject}] Cannot fetch Access Token: token is empty.`);
            break;
        case RequestErrorType.SUCCESS:
            console.log(`[${subject}] Fetched Access Token successfully.`);
            break;
        default:
            console.log(`[${subject}] Cannot fetch Access Token: unknown issue.`);
            break;
    }
};

const convert = (error: string) => {
    switch(error) {
        case RequestErrorType.ERR_NETWORK:
            return RequestErrorType.ERR_NETWORK;
        case RequestErrorType.ERR_BAD_REQUEST:
            return RequestErrorType.ERR_BAD_REQUEST;
        default:
            return RequestErrorType.UNKNOWN;
    }
};

export { convert, resolve, RequestErrorType as Type };