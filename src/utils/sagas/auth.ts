import {
  all,
  call,
  put,
  delay,
  fork,
  take,
  race,
  select,
} from "redux-saga/effects";

import * as auth from "../reducers/auth";
import { Actions as actions, ActionTypes } from "../reducers/auth";

import axios, { AxiosInstance } from "axios";
import * as config from "../../config";
import * as RequestError from "../hooks/auth/auth.error";
import { RootState } from "../reducers";

// Axios 인스턴스 객체이다.
export const instance: AxiosInstance = axios.create({
  baseURL: `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}`,
});

// Cookie를 보내기 위해서는 이 작업이 필요하다.
instance.defaults.withCredentials = true;

// 10초가 지나도 응답이 없으면 로그인을 중지한다.
export const AUTH_TIMEOUT_MS = 10000;
export const ACCESS_TOKEN_EXPIRY = 1800000;

const authorize = function* () {
  try {
    const { token, timeout } = yield race({
      token: call(instance.get, config.API_ACCESS),
      timeout: delay(AUTH_TIMEOUT_MS),
    });

    if (!!timeout) {
      // 제한 시간을 초과하였을 때
      throw new Error(RequestError.Type.ERR_NETWORK);
    }

    if (!token) {
      // 유효하지 않은 토큰일 때
      throw new Error(RequestError.Type.EMPTY);
    }

    // Access Token이 존재하면 Header에 추가한다.
    instance.defaults.headers.common["Authorization"] = `Bearer ${token.data}`;
    yield put(actions.authorize());
  } catch (ex) {
    RequestError.resolve(
      ex instanceof Error
        ? RequestError.convert(ex.message)
        : RequestError.Type.UNKNOWN
    );

    yield put(actions.unauthorize());
  }
};

const checkToken = function* () {
  const state: auth.AuthState = yield select((state: RootState) => state.auth);

  if (!state.loaded) {
    yield call(authorize);
  }
};

const checkExpiration = function* () {
  while (true) {
    // 만료 시간이 가까워질 때까지 기다린다.
    yield delay(ACCESS_TOKEN_EXPIRY);

    // AT를 다시 가져온다.
    yield fork(authorize);

    // 인증 결과 응답이 올 때까지 기다린다.
    yield take([ActionTypes.AUTHORIZE, ActionTypes.UNAUTHORIZE]);
    const state: auth.AuthState = yield select(
      (state: RootState) => state.auth
    );

    // 만약 다른 이유로 인해 인증에 실패하면, 타이머를 멈춘다.
    if (!state.authorized) {
        break;
    }
  }
};

// Access Token: AT, Refresh Token: RT
//
// AT을 이용한 인증 플로우를 나타낸다.
// 1. 맨 처음 로드 시, RT를 이용해 백엔드 서버로부터 AT를 가져온다.
//
// 2. RT가 존재하지 않으면 (= 비로그인 상태), 익명으로 인증된다.
//
// 3. AT가 존재한 상태에서는,
// 3-1. 로그아웃 시 다시 익명으로 돌아간다.
// 3-2. 타이머를 돌려 AT의 만료 시간이 가까워지면, RT를 이용해 AT를 새로고침한다.
// (이때, RT의 만료 기한은 백엔드 서버에서 다룬다.)
//
// 4. RT가 없는 상태에서는,
// 4-1. 일련의 인증 과정을 통해 백엔드로부터 RT를 가져올 수 있도록 한다.
// 4-2. 이때 4-1에서 페이지가 다시 로드되므로 특별한 로직이 필요하지 않다.
const userFlow = function* () {
  // 처음 로드 시 AT를 가져온다.
  yield fork(checkToken);

  // 인증 결과 응답이 올 때까지 기다린다.
  yield take([ActionTypes.AUTHORIZE, ActionTypes.UNAUTHORIZE]);
  const state: auth.AuthState = yield select((state: RootState) => state.auth);

  // 성공적으로 AT를 가져온 경우
  if (state.authorized) {
    // 만료 기한을 체크할 수 있도록 따로 타이머를 돌린다.
    yield fork(checkExpiration);

    // 로그아웃 요청이 올 때까지 기다린다.
    yield take(ActionTypes.SAGA_LOGOUT);
    yield put(actions.unauthorize());
  }
};

export default function* authSaga() {
  yield all([fork(userFlow)]);
}
