import { all, fork } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import pageSaga from "./page";
import headerSaga from "./header";
import authSaga from "./auth";
import editorSaga from "./editor";
import profileSaga from "./profile";
import validationSaga from "./validation/validation";
import modalSaga from "./modal";

export const sagaMiddleware = createSagaMiddleware();

export default function* rootSaga() {
  yield all([
    fork(pageSaga),
    fork(headerSaga),
    fork(authSaga),
    fork(editorSaga),
    fork(profileSaga),
    fork(validationSaga),
    fork(modalSaga),
  ]);
}
