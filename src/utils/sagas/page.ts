import { all, call, put, delay, fork, takeLatest } from "redux-saga/effects";
import { Actions as actions, ActionTypes } from "../reducers/page";

const DEBOUNCE_DELAY = 300;

// handler
const pageHeightSaga = function* (
  action: ReturnType<typeof actions.updatePageHeight>
) {
  // 300ms 디바운싱
  yield delay(DEBOUNCE_DELAY);
  yield put(actions.updatePageHeight(action.payload));
};

const headerHeightSaga = function* (
  action: ReturnType<typeof actions.updateHeaderHeight>
) {
  // 300ms 디바운싱
  yield delay(DEBOUNCE_DELAY);
  yield put(actions.updateHeaderHeight(action.payload));
};

const footerHeightSaga = function* (
  action: ReturnType<typeof actions.updateFooterHeight>
) {
  // 300ms 디바운싱
  yield delay(DEBOUNCE_DELAY);
  yield put(actions.updateFooterHeight(action.payload));
};

// watch
const watchPageHeight = function* () {
  yield takeLatest(ActionTypes.UPDATE_PAGE_HEIGHT, pageHeightSaga);
};

const watchHeaderHeight = function* () {
  yield takeLatest(ActionTypes.UPDATE_HEADER_HEIGHT, headerHeightSaga);
};

const watchFooterHeight = function* () {
  yield takeLatest(ActionTypes.UPDATE_FOOTER_HEIGHT, footerHeightSaga);
};

// total
export default function* pageSaga() {
  yield all([
    fork(watchPageHeight),
    fork(watchHeaderHeight),
    fork(watchFooterHeight),
  ]);
}
