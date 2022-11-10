import { AxiosInstance } from "axios";
import { useCallback } from "react";

import * as config from "../../../config";
import { DataRequest } from "./request.type";

const useRequest = () => {

    // back-end로부터 get 요청 (/...로 시작)
    const get: DataRequest = useCallback(async <T>(auth: AxiosInstance, url: string) => {
        const response = await auth.get(`/${url}`);
        return response.data as T;
    }, []);

    const apiGet: DataRequest = useCallback(async <T>(auth: AxiosInstance, url: string) => {
        const response = await auth.get(`/${config.API_ROUTE}/${url}`);
        return response.data as T;
    }, []);

    return { get, apiGet };
};

export { useRequest };