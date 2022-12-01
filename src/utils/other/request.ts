import { AxiosInstance } from "axios";
import * as config from "../../config";

interface DataRequest {
  <T>(auth: AxiosInstance, url: string): Promise<T>;
}

// back-end로부터 get 요청 (/...로 시작)
export const get: DataRequest = async <T>(auth: AxiosInstance, url: string) => {
  const response = await auth.get(`/${url}`);
  return response.data as T;
};

export const apiGet: DataRequest = async <T>(
  auth: AxiosInstance,
  url: string
) => {
  const response = await auth.get(`/${config.API_ROUTE}/${url}`);
  return response.data as T;
};
