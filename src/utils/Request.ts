import axios, { AxiosInstance } from "axios";
import * as config from '../config';

const instance: AxiosInstance = axios.create({
    baseURL: `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}`
});

// Cookie 를 보내기 위해서는 이 작업이 필요하다.
instance.defaults.withCredentials = true;

// 현재 accessToken 가지고 있는 여부
let hasToken: boolean = false;

interface AxiosRequest {
    authenticated: boolean,
    axios?: AxiosInstance
}

// axios instance를 그대로 반환하지 않고, accessToken 관련 전처리 로직을 먼저 수행한 후 반환한다.
// 이때 accessToken이 먼저 담겨진 뒤에 HTTP Request가 수행되어야 하므로, Promise 객체로 반환된다.
const Request: () => Promise<AxiosRequest> = async () => {
    if (!hasToken) {
        // 백엔드 단으로부터 accessToken을 가져온다.
        // 이때 refreshToken을 cookie로 가지고 있어야 한다.
        try {
            const accessToken = await instance.get('/auth/access');

            if (!accessToken) {
                throw new Error("token is empty");
            }

            // 200 OK
            // accessToken이 존재하면 Header에 추가한다.
            hasToken = true;
            instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken.data}`;
            console.log("[Request.js] Fetched Access Token successfully.");
        } catch(ex) {
            if (ex instanceof Error) {
                let code = ex.message;
                // 예외 처리 과정
                // 만약 존재하지 않다면 (= refreshToken이 없다면) instance 그대로 반환한다.
                switch (code) {
                    case 'ERR_NETWORK':
                        console.log("[Request.js] Cannot fetch Access Token; failed to connect with Back-end Server.");
                        break;
                    case 'ERR_BAD_REQUEST':
                        // 404 Not Found
                        console.log("[Request.js] Cannot fetch Access Token; cannot find Refresh Token (need to login.)");
                        break;
                    default:
                        console.log("[Request.js] Cannot fetch Access Token; Error: " + code);
                        break;
                }
            } else {
                console.log("[Request.js] Cannot fetch Access Token; Error: " + String(ex));
            }
        }
    }

    return { authenticated: hasToken, axios: instance };
};

export default Request;