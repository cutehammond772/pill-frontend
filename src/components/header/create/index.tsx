import { Header } from "../../../layouts/header";

import * as React from "react";
import { useEffect, useState, useCallback } from "react";

import { useHeader } from "../../../utils/hooks/header";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "./modal";
import { useValidation } from "../../../utils/hooks/validation";

import * as Pill from "../../../utils/validators/create/pill";
import { useSnackbar } from "notistack";
import { ValidatedType } from "../../../utils/validators/validator.type";
import { usePillDefaultEditor } from "../../../utils/hooks/pill_creator";

const CreateHeaderSignature = "CreateHeader";

const CreateMenu = {
  EDITOR: "편집",
  PREVIEW: "미리보기",
  SAVE: "등록",
} as const;

type CreateMenuItem = typeof CreateMenu[keyof typeof CreateMenu];

const CreateHeader = () => {
  const header = useHeader<typeof CreateMenu>(
    CreateHeaderSignature,
    CreateMenu.EDITOR
  );

  const navigate = useNavigate();
  const validator = useValidation(Pill.Validator);
  const { enqueueSnackbar } = useSnackbar();
  const editor = usePillDefaultEditor();

  const [exitConfirm, setExitConfirm] = useState<boolean>(false);

  const handleClick = useCallback((type: CreateMenuItem) => {
    switch (type) {
      case CreateMenu.EDITOR:
        // 편집 페이지로 전환 시 검증 제한을 초기화한다.
        validator.needValidateAll("validator\\.create\\.");
        navigate("/create");
        break;
      case CreateMenu.PREVIEW:
        if (validator.validation.result !== ValidatedType.VALID) {
          enqueueSnackbar("모든 내용을 입력해야 미리보기가 가능합니다.", {
            variant: "error",
            preventDuplicate: true,
          });

          return;
        }

        navigate("/create/preview");
        break;
      case CreateMenu.SAVE:
        if (validator.validation.result !== ValidatedType.VALID) {
          enqueueSnackbar("모든 내용을 입력해야 등록이 가능합니다.", {
            variant: "error",
            preventDuplicate: true,
          });

          return;
        }

        // SAVE logic
        break;
    }
  }, [enqueueSnackbar, navigate, validator]);

  const preventClose = useCallback((event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = "";
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", preventClose);
    return () => window.removeEventListener("beforeunload", preventClose);
  }, [preventClose]);

  const handleHomeClick = useCallback(() => {
    setExitConfirm(true);
  }, []);

  const handleHomeConfirm = useCallback(() => {
    editor.resetAll();
    navigate("/");
  }, [editor, navigate]);

  return (
    <>
      <Header
        title={header.title}
        menu={{
          enum: CreateMenu,
          refs: header.refs,
          selected: header.selectedItems,
          disabled: header.disabledItems,
          onClick: handleClick,
        }}
        onHomeClick={handleHomeClick}
      />
      <ConfirmModal
        open={exitConfirm}
        onClose={() => setExitConfirm(false)}
        onConfirm={handleHomeConfirm}
      />
    </>
  );
};

export { CreateHeader, CreateMenu, CreateHeaderSignature };
