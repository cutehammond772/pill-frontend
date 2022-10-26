import axios, { AxiosInstance } from "axios";
import * as config from '../../config';

import * as RequestError from "./request.error";
import { AsyncAxiosRequest } from "./request.type";
const instance: AxiosInstance = axios.create({
    baseURL: `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}`
});

// Cookie 를 보내기 위해서는 이 작업이 필요하다.
instance.defaults.withCredentials = true;

// 현재 accessToken 가지고 있는 여부
let authenticated: boolean = false;

// axios instance를 그대로 반환하지 않고, accessToken 관련 전처리 로직을 먼저 수행한 후 반환한다.
// 이때 accessToken이 먼저 담겨진 뒤에 HTTP Request가 수행되어야 하므로, Promise 객체로 반환된다.
const Request: AsyncAxiosRequest = async () => {
    if (!authenticated) {
        // 백엔드 단으로부터 accessToken을 가져온다.
        // 이때 refreshToken을 cookie로 가지고 있어야 한다.
        try {
            const accessToken = await instance.get('/auth/access');

            if (!accessToken) {
                throw new Error(RequestError.Type.EMPTY);
            }

            // 200 OK
            // accessToken이 존재하면 Header에 추가한다.
            authenticated = true;
            instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken.data}`;
            
            RequestError.resolve(RequestError.Type.SUCCESS, "Request");
        } catch(ex) {
            RequestError.resolve((ex instanceof Error) ? RequestError.convert(ex.message) : RequestError.Type.UNKNOWN, "Request");
        }
    }

    return { authenticated: authenticated, axios: instance };
};

export default Request;