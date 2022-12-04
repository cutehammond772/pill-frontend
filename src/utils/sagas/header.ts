import { all, put, fork, take } from "redux-saga/effects";
import { ActionTypes as PageTransitionActionTypes } from "../reducers/page/transition";
import { Actions as headerActions } from "../reducers/header";

// Transition(페이지 전환)이 진행 중이면 메뉴의 클릭을 막는다.
function* interactionFlow() {
  while (true) {
    yield take(PageTransitionActionTypes.START_TRANSITION);
    yield put(headerActions.lockInteraction());

    yield take(PageTransitionActionTypes.END_TRANSITION);
    yield put(headerActions.unlockInteraction());
  }
}

export default function* headerSaga() {
  yield all([fork(interactionFlow)]);
}
