import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";
import { ModalType } from "../../layouts/modal/modal.type";

import * as Map from "../other/data-structure/index-signature-map";
import { COPY_NOTHING } from "../other/data-structure/options";
import { identity } from "../other/identity";

export const REDUCER_NAME = "modal";

export type AnyProps = { [key: string]: any };
export type ModalInfo = { type: ModalType; open: boolean };

export interface ModalState {
  data: { [modalID: string]: AnyProps };
  info: { [modalID: string]: ModalInfo };
}

const initialState: ModalState = {
  data: {},
  info: {},
};

// Saga 로직에서 받는 요청
export const SagaActionTypes = {
  // 모달 생성 요청
  SAGA_CREATE: `${REDUCER_NAME}/SAGA_CREATE`,

  // 모달 삭제 요청
  SAGA_REQUEST_REMOVE: `${REDUCER_NAME}/SAGA_REQUEST_REMOVE`,

  // (삭제 요청 후) ModalTransition이 END일 때 (= 화면에서 안보이면) 응답
  SAGA_RESPONSE_END_TRANSITION: `${REDUCER_NAME}/SAGA_RESPONSE_END_TRANSITION`,
} as const;

// Reducer 요청
export const ReducerActionTypes = {
  // 모달 데이터를 Redux Store에 저장
  CREATE: `${REDUCER_NAME}/CREATE`,

  // 모달 닫기
  CLOSE: `${REDUCER_NAME}/CLOSE`,

  // 모달 데이터를 redux store에서 삭제
  REMOVE: `${REDUCER_NAME}/REMOVE_MODAL`,
} as const;

// hook 또는 외부 로직에서의 요청
export const Actions = {
  createModal: createAction<{ type: ModalType; props: AnyProps }>(
    SagaActionTypes.SAGA_CREATE
  ),

  removeModal: createAction<{ modalID: string }>(
    SagaActionTypes.SAGA_REQUEST_REMOVE
  ),
} as const;

// saga 로직 등 내부 로직에서의 요청
export const InternalActions = {
  createModal: createAction<{
    type: ModalType;
    props: AnyProps;
    modalID: string;
  }>(ReducerActionTypes.CREATE),
  closeModal: createAction<{ modalID: string }>(ReducerActionTypes.CLOSE),
  removeModal: createAction<{ modalID: string }>(ReducerActionTypes.REMOVE),

  responseEnd: createAction<{ modalID: string }>(
    SagaActionTypes.SAGA_RESPONSE_END_TRANSITION
  ),
} as const;

const modalIDFn = (_: RootState, modalID: string) => modalID;

const dataSelector = (state: RootState) => state.modal.data;
const infoSelector = (state: RootState) => state.modal.info;

export const DynamicSelectors = {
  DATA: () =>
    createSelector([dataSelector, modalIDFn], (data, modalID) => data[modalID]),
} as const;

export const StaticSelectors = {
  INFOS: createSelector([infoSelector], identity),
} as const;

const modalReducer = createReducer(initialState, {
  [ReducerActionTypes.CREATE]: (
    state,
    action: ReturnType<typeof InternalActions.createModal>
  ) => {
    const { type, props, modalID } = action.payload;

    Map.put(state.data, modalID, props, COPY_NOTHING);
    Map.put(state.info, modalID, { type: type, open: true }, COPY_NOTHING);
  },

  [ReducerActionTypes.CLOSE]: (
    state,
    action: ReturnType<typeof InternalActions.closeModal>
  ) => {
    const { modalID } = action.payload;

    Map.replace(
      state.info,
      modalID,
      (info) => {
        if (!info) {
          throw new Error(
            "[modalReducer] 존재하지 않는 modal에 대해 close를 요청했습니다."
          );
        }

        return { ...info, open: false };
      },
      COPY_NOTHING
    );
  },

  [ReducerActionTypes.REMOVE]: (
    state,
    action: ReturnType<typeof InternalActions.removeModal>
  ) => {
    Map.remove(state.data, action.payload.modalID, COPY_NOTHING);
    Map.remove(state.info, action.payload.modalID, COPY_NOTHING);
  },
});

export default modalReducer;
