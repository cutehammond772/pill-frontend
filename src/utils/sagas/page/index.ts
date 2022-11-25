import { all, call, put, delay, fork, takeLatest } from "redux-saga/effects";
import * as reducer from "../../reducers/page";

const DEBOUNCE_DELAY = 300;

// handler
function* pageHeightSaga(action: ReturnType<typeof reducer.updatePageHeight>) {
    // 300ms 디바운싱
    yield call(delay, DEBOUNCE_DELAY);
    yield put(reducer.updatePageHeight(action.payload));
}

function* headerHeightSaga(action: ReturnType<typeof reducer.updateHeaderHeight>) {
    // 300ms 디바운싱
    yield call(delay, DEBOUNCE_DELAY);
    yield put(reducer.updateHeaderHeight(action.payload));
}

function* footerHeightSaga(action: ReturnType<typeof reducer.updateFooterHeight>) {
    // 300ms 디바운싱
    yield call(delay, DEBOUNCE_DELAY);
    yield put(reducer.updateFooterHeight(action.payload));
}

// watch
function* watchPageHeight() {
    yield takeLatest(reducer.updatePageHeight, pageHeightSaga);
}

function* watchHeaderHeight() {
    yield takeLatest(reducer.updateHeaderHeight, headerHeightSaga);
}

function* watchFooterHeight() {
    yield takeLatest(reducer.updateFooterHeight, footerHeightSaga);
}

// total
export function* pageSaga() {
    yield all([fork(watchPageHeight), fork(watchHeaderHeight), fork(watchFooterHeight)]);
}