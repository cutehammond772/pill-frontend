import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import axios, { AxiosInstance } from "axios";

import { RootState } from "../../reducers";
import { confirmAuthentication, confirmLogout } from "../../reducers/auth";
import * as config from "../../../config";

import * as RequestError from "./auth.error";

// AxiosInstance
const instance: AxiosInstance = axios.create({
  baseURL: `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}`,
});

// Cookie를 보내기 위해서는 이 작업이 필요하다.
instance.defaults.withCredentials = true;

const useAuth = () => {
  const dispatch = useDispatch();

  const axios = instance;

  // access token을 redux container에 넣는 것은 보안상 좋지 않으므로, authenticated 여부만 담는다.
  const authenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  );

  // 로그인 함수
  const authenticate = useCallback(async () => {
    // accessToken을 가져오는 함수를 호출한다.
    const success: boolean = await fetchAccessToken();

    // fetch 성공 여부(= 로그인 성공 여부)를 redux container에 저장한다.
    dispatch(success ? confirmAuthentication() : confirmLogout());

    // callback chain이 생길 시에 활용할 수 있도록 성공 여부를 같이 넘겨준다.
    return success;
  }, [dispatch]);

  // 로그아웃 함수
  const logout = useCallback(() => {
    if (!!instance.defaults.headers.common["Authorization"])
      delete instance.defaults.headers.common["Authorization"];
    dispatch(confirmLogout());
  }, [dispatch]);

  return { axios, authenticated, authenticate, logout };
};

const fetchAccessToken = async () => {
  try {
    const accessToken = await instance.get(config.API_ACCESS);

    if (!accessToken) {
      throw new Error(RequestError.Type.EMPTY);
    }

    // accessToken이 존재하면 Header에 추가한다.
    instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken.data}`;

    RequestError.resolve(RequestError.Type.SUCCESS);
    // fetch 성공
    return true;
  } catch (ex) {
    RequestError.resolve(
      ex instanceof Error
        ? RequestError.convert(ex.message)
        : RequestError.Type.UNKNOWN
    );

    // fetch 실패
    return false;
  }
};

type AuthenticationHook = ReturnType<typeof useAuth>;

export { useAuth, type AuthenticationHook };