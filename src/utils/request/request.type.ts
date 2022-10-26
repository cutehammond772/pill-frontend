import { AxiosInstance } from "axios";

interface RequestData {
    authenticated: boolean,
    axios?: AxiosInstance
};

interface AsyncAxiosRequest {
    (): Promise<RequestData>
};

export type { RequestData, AsyncAxiosRequest };