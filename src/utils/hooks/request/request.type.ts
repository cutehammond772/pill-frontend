import { AxiosInstance } from "axios";

interface DataRequest {
    <T>(auth: AxiosInstance, url: string): Promise<T>
};

export type { DataRequest };