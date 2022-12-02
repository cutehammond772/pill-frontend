import {
  all,
  put,
  fork,
  take,
  actionChannel,
  select,
} from "redux-saga/effects";
import { Actions as actions, ActionTypes } from "../reducers/editor";
import { Actions as rollbackActions } from "../reducers/rollback";

import { ActionTypes as PageTransitionActionTypes } from "../reducers/page-transition";
import { PillContentData, PillIndexData } from "../pill/pill.type";
import { RootState } from "../reducers";
import { Channel } from "redux-saga";

// 편집 모드의 시퀀스를 나타낸다.
const editorFlow = function* () {
  while (true) {
    // 편집 모드 시작을 기다린다.
    yield all([
      take(ActionTypes.SAGA_BEGIN),
      take(PageTransitionActionTypes.END_TRANSITION),
    ]);
    // 편집을 활성화한다.
    yield put(actions.setAvailable({ available: true }));

    // 편집 도중 //

    // 편집이 완전히 종료되고 다른 페이지로 넘어갔을 때
    yield all([
      take(ActionTypes.SAGA_FINISH),
      take(PageTransitionActionTypes.END_TRANSITION),
    ]);
    // 편집을 비활성화한다.
    yield put(actions.setAvailable({ available: false }));
    // 편집 데이터를 모두 삭제한다.
    yield put(actions.reset());
  }
};

// 인덱스 삭제 요청 시 먼저 백업 후에 삭제한다.
const watchIndexRemove = function* () {
  // 삭제 요청을 누적시킨다.
  const channel: Channel<ReturnType<typeof actions.removeIndex>> =
    yield actionChannel(ActionTypes.SAGA_REMOVE_INDEX);

  while (true) {
    // 위에서 요청을 하나씩 가져온다.
    const action: ReturnType<typeof actions.removeIndex> = yield take(channel);
    // redux store로부터 인덱스 데이터를 가져온다.
    const data: PillIndexData = yield select((state: RootState) =>
      state.editor.indexes.find((index) => index.id === action.payload.id)
    );

    if (!data) {
      throw new Error("[watchIndexRemove] 유효하지 않은 인덱스 ID입니다.");
    }

    // 먼저 백업한다.
    yield put(rollbackActions.captureIndex({ data }));
    // 이후에 인덱스 삭제를 수행한다.
    yield put(actions.removeIndexImmadiately(action.payload));
  }
};

// 컨텐츠 삭제 요청 시 먼저 백업 후에 삭제한다.
const watchContentRemove = function* () {
  // 삭제 요청을 누적시킨다.
  const channel: Channel<ReturnType<typeof actions.removeContent>> =
    yield actionChannel(ActionTypes.SAGA_REMOVE_CONTENT);

  while (true) {
    // 위에서 요청을 하나씩 가져온다.
    const action: ReturnType<typeof actions.removeContent> = yield take(
      channel
    );

    // redux store로부터 컨텐츠 데이터를 가져온다.
    const index: PillIndexData | undefined = yield select((state: RootState) =>
      state.editor.indexes.find((index) => index.id === action.payload.id)
    );

    if (!index) {
      throw new Error("[watchContentRemove] 유효하지 않은 인덱스 ID입니다.");
    }

    const data: PillContentData | undefined = index.contents.find(
      (content) => content.contentId === action.payload.contentId
    );

    if (!data) {
      throw new Error("[watchContentRemove] 유효하지 않은 컨텐츠 ID입니다.");
    }

    // 먼저 백업한다.
    yield put(rollbackActions.captureContent({ data }));
    // 이후에 컨텐츠 삭제를 수행한다.
    yield put(actions.removeContentImmadiately(action.payload));
  }
};

export default function* editorSaga() {
  yield all([
    fork(editorFlow),
    fork(watchIndexRemove),
    fork(watchContentRemove),
  ]);
}