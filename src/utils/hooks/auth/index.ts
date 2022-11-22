import { useCallback, useEffect } from "react";
import axios, { AxiosInstance } from "axios";

import * as config from "../../../config";
import * as RequestError from "./auth.error";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { confirmAuth, confirmUnauth } from "../../reducers/auth";
import { useRunOnce } from "../run_once";

// Axios 인스턴스 객체이다.
const instance: AxiosInstance = axios.create({
  baseURL: `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}`,
});

// Cookie를 보내기 위해서는 이 작업이 필요하다.
instance.defaults.withCredentials = true;

const fetchAccessToken = async () => {
  const accessToken = await instance.get(config.API_ACCESS);

  if (!accessToken) {
    throw new Error(RequestError.Type.EMPTY);
  }

  // accessToken이 존재하면 Header에 추가한다.
  instance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken.data}`;
};

// Loader 역할이란, 첫 번째 렌더링 시에 필요한 정보가 있을 때 외부에서 가져오는 역할을 의미한다.
const useAuth = (loader?: boolean) => {
  const dispatch = useDispatch();

  const lock = useRunOnce("useAuth");

  // 백엔드 서버로부터 인증 정보를 가져온(= 로드한) 여부를 나타낸다. (실패하여도 로드되었다고 간주한다.)
  const loaded = useSelector((state: RootState) => state.auth.loaded);

  // 인증 정보를 성공적으로 가져온 여부를 나타낸다.
  const authenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  );

  // 로그아웃 함수
  const logout = useCallback(() => {
    !!instance.defaults.headers.common["Authorization"] &&
      delete instance.defaults.headers.common["Authorization"];

    dispatch(confirmUnauth());
  }, [dispatch]);

  // 인증 정보를 새로고침한다.
  const refresh = useCallback(() => {
    fetchAccessToken()
      .then(() => {
        RequestError.resolve(RequestError.Type.SUCCESS);
        dispatch(confirmAuth());
      })
      .catch((ex) => {
        RequestError.resolve(
          ex instanceof Error
            ? RequestError.convert(ex.message)
            : RequestError.Type.UNKNOWN
        );
        dispatch(confirmUnauth());
      });
  }, [dispatch]);

  // Loader
  useEffect(() => {
    !!loader && lock.runOnce(refresh);
  });

  return {
    axios: instance,
    authenticated: loaded && authenticated,
    loaded,
    refresh,
    logout,
  };
};

export { useAuth };
