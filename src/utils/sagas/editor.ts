import {
  all,
  put,
  fork,
  take,
  call,
  actionChannel,
  select,
} from "redux-saga/effects";
import {
  Actions as actions,
  InternalActions as internal,
  ActionTypes,
} from "../reducers/editor";
import { InternalActions as rollbackActions } from "../reducers/rollback";
import { InternalActions as validationActions } from "../reducers/validation";

import { PAGE_EVENT_FIRST_PAGE } from "../reducers/page/event";
import { ActionTypes as PageTransitionActionTypes } from "../reducers/page/transition";
import { PillContentData, PillIndexData } from "../pill/pill.type";
import { RootState } from "../reducers";
import { Channel } from "redux-saga";

// 편집 모드의 시퀀스를 나타낸다.
const editorFlow = function* () {
  while (true) {
    // 편집 모드 시작을 기다린다.
    yield take(ActionTypes.SAGA_BEGIN);

    const firstPage: boolean = yield select(PAGE_EVENT_FIRST_PAGE);

    if (firstPage) {
      alert("유효하지 않은 접근입니다.");
      // navigate to home
      continue;
    }

    // 편집을 활성화한다.
    yield put(internal.setAvailable({ available: true }));

    // 편집 도중 //

    // 다른 페이지로 완전히 이동한 뒤에 편집 모드를 비활성화한다.
    // => 페이지 이동(transition) 구조상, 이동하는 과정에서 두 페이지가 공존하는데
    // 이때 편집 데이터를 삭제하면 기존 편집 페이지에서 오류가 발생하기 때문이다.
    yield take(ActionTypes.SAGA_FINISH);
    yield take(PageTransitionActionTypes.END_TRANSITION);

    // 편집을 비활성화한다.
    yield put(internal.setAvailable({ available: false }));

    // 편집 데이터를 모두 삭제한다.
    yield put(internal.reset());

    // 검증 데이터를 삭제한다.
    yield put(validationActions.clear({ prefix: "validator.create" }));

    // 롤백 데이터를 삭제한다.
    yield put(rollbackActions.reset());
  }
};

// 편집 모드가 활성화되었는지 확인한다.
const editorAvaliableCheck = function* () {
  const available: boolean = yield select(
    (state: RootState) => state.editor.available
  );

  if (!available) {
    throw new Error(
      "[editorAvaliableCheck] 편집 모드가 비활성화된 상태에서 편집 시도가 있었습니다."
    );
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

    // 편집 모드가 활성화되었는지 확인한다.
    yield call(editorAvaliableCheck);

    // redux store로부터 인덱스 데이터를 가져온다.
    const data: PillIndexData = yield select((state: RootState) =>
      state.editor.indexes.find((index) => index.id === action.payload.id)
    );

    if (!data) {
      throw new Error("[watchIndexRemove] 유효하지 않은 인덱스 ID입니다.");
    }

    // 먼저 인덱스 데이터를 백업한다.
    yield put(rollbackActions.captureIndex({ data }));

    // 이후에 인덱스 삭제를 수행한다.
    yield put(internal.removeIndexImmadiately(action.payload));
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

    // 편집 모드가 활성화되었는지 확인한다.
    yield call(editorAvaliableCheck);

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

    // 먼저 컨텐츠 데이터를 백업한다.
    yield put(rollbackActions.captureContent({ data }));

    // 이후에 컨텐츠 삭제를 수행한다.
    yield put(internal.removeContentImmadiately(action.payload));
  }
};

export default function* editorSaga() {
  yield all([
    fork(editorFlow),
    fork(watchIndexRemove),
    fork(watchContentRemove),
  ]);
}
