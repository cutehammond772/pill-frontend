import { all, fork } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";

export const sagaMiddleware = createSagaMiddleware();

export default function* rootSaga() {
    yield all([]);
};