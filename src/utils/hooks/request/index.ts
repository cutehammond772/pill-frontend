import { useCallback } from "react";

import * as config from "../../../config";
import { AuthenticationHook } from "../auth";
import { DataRequest } from "./request.type";

const useRequest = (auth: AuthenticationHook) => {
    const axios = auth.axios;

    // back-end로부터 get 요청 (/...로 시작)
    const get: DataRequest = useCallback(async <T>(url: string) => {
        const response = await axios.get(`/${url}`);
        return response.data as T;
    }, [axios]);

    const apiGet: DataRequest = useCallback(async <T>(url: string) => {
        const response = await axios.get(`/${config.API_ROUTE}/${url}`);
        return response.data as T;
    }, [axios]);

    return { get, apiGet };
};

export { useRequest };