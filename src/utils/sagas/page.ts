import { all, put, delay, fork, select, takeLatest, takeEvery } from "redux-saga/effects";
import { Actions as actions, InternalActions as internal, ActionTypes } from "../reducers/page/size";
import { ActionTypes as EventTypes, InternalActions as events, PAGE_EVENT_FIRST_PAGE } from "../reducers/page/event";

const DEBOUNCE_DELAY = 300;

// handler
const pageHeightSaga = function* (
  action: ReturnType<typeof actions.updatePageHeight>
) {
  // 300ms 디바운싱
  yield delay(DEBOUNCE_DELAY);
  yield put(internal.updatePageHeight(action.payload));
};

const headerHeightSaga = function* (
  action: ReturnType<typeof actions.updateHeaderHeight>
) {
  // 300ms 디바운싱
  yield delay(DEBOUNCE_DELAY);
  yield put(internal.updateHeaderHeight(action.payload));
};

const footerHeightSaga = function* (
  action: ReturnType<typeof actions.updateFooterHeight>
) {
  // 300ms 디바운싱
  yield delay(DEBOUNCE_DELAY);
  yield put(internal.updateFooterHeight(action.payload));
};

const navigateSaga = function* () {
  const firstPage: boolean = yield select(PAGE_EVENT_FIRST_PAGE);

  if (firstPage) {
    yield put(events.leaveFirstPage());
  }
}

// watch
const watchPageHeight = function* () {
  yield takeLatest(ActionTypes.SAGA_UPDATE_PAGE_HEIGHT, pageHeightSaga);
};

const watchHeaderHeight = function* () {
  yield takeLatest(ActionTypes.SAGA_UPDATE_HEADER_HEIGHT, headerHeightSaga);
};

const watchFooterHeight = function* () {
  yield takeLatest(ActionTypes.SAGA_UPDATE_FOOTER_HEIGHT, footerHeightSaga);
};

const watchNavigate = function* () {
  yield takeEvery(EventTypes.SAGA_NAVIGATE_ATTEMPT, navigateSaga);
}

export default function* pageSaga() {
  yield all([
    fork(watchPageHeight),
    fork(watchHeaderHeight),
    fork(watchFooterHeight),
    fork(watchNavigate),
  ]);
}
