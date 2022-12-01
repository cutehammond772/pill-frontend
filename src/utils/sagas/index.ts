import { all, fork } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import pageSaga from "./page";
import headerSaga from "./header";
import authSaga from "./auth";
import creatorSaga from "./creator";
import profileSaga from "./profile";
import validationSaga from "./validation";

export const sagaMiddleware = createSagaMiddleware();

export default function* rootSaga() {
  yield all([
    fork(pageSaga),
    fork(headerSaga),
    fork(authSaga),
    fork(creatorSaga),
    fork(profileSaga),
    fork(validationSaga),
  ]);
}
