import { SerializedStyles } from "@emotion/react";
import { ConfirmModal } from "../../components/modal/create/confirm";
import AddImageContentModal from "../../components/modal/image/add";
import EditImageContentModal from "../../components/modal/image/edit";
import { ProfileTabModal } from "../../components/profile/tab";

// 모달 Transition의 기본 지속 시간이다. (밀리초)
export const DEFAULT_DURATION = 500;

// Custom Modal을 만들 때 이를 통해 Transition Animation을 커스텀할 수 있다.
export interface TransitionProps {
  // 각 ModalTransition마다 요소의 스타일을 설정한다.
  transitions: { [type in ModalTransition]: SerializedStyles };

  // 각 요소의 transition 지속 시간을 설정한다.
  durations: SerializedStyles;
}

export const ModalTransitions = {
  ENTERING: "Entering",
  ENTERED: "Entered",
  EXITING: "Exiting",
  EXITED: "Exited",
} as const;

export type ModalTransition =
  typeof ModalTransitions[keyof typeof ModalTransitions];

export interface CustomModalProps {
  // 이 모달이 활성화된 여부를 나타낸다.
  open: boolean;

  // 이 모달의 고유 ID이다.
  modalID: string;

  // 모달을 닫는 요청을 보낸다.
  onClose: () => void;
}

export const ModalTypes = {
  ADD_IMAGE_CONTENT: "ADD_IMAGE_CONTENT",
  EDIT_IMAGE_CONTENT: "EDIT_IMAGE_CONTENT",
  PROFILE_TAB: "PROFILE_TAB",
  CREATE_CONFIRM: "CREATE_CONFIRM",
} as const;

export type ModalType = typeof ModalTypes[keyof typeof ModalTypes];

export type ModalMapperType = {
  [modal in ModalType]: React.ComponentType<CustomModalProps>;
};

export const ModalMapper = (): ModalMapperType => ({
  [ModalTypes.ADD_IMAGE_CONTENT]: AddImageContentModal,
  [ModalTypes.EDIT_IMAGE_CONTENT]: EditImageContentModal,
  [ModalTypes.PROFILE_TAB]: ProfileTabModal,
  [ModalTypes.CREATE_CONFIRM]: ConfirmModal,
});
