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
import { usePillDefaultEditor } from "../../../utils/hooks/pill-creator";
import { Menus } from "../../../utils/hooks/header/header.type";
import { L10N } from "../../../localization";
import { useLocalization } from "../../../utils/hooks/l10n";

const CreateHeaderSignature = "CreateHeader";

const CreateMenus: Menus = {
  EDITOR: L10N.HEADER_CREATE_01,
  PREVIEW: L10N.HEADER_CREATE_02,
  SAVE: L10N.HEADER_CREATE_03,
} as const;

type CreateMenu = typeof CreateMenus[keyof typeof CreateMenus];

const CreateHeader = () => {
  const { text } = useLocalization();
  const header = useHeader<typeof CreateMenus>(
    CreateHeaderSignature,
    CreateMenus.EDITOR
  );

  const navigate = useNavigate();
  const validator = useValidation(Pill.Validator);
  const { enqueueSnackbar } = useSnackbar();
  const editor = usePillDefaultEditor();

  const [exitConfirm, setExitConfirm] = useState<boolean>(false);

  const handleClick = useCallback(
    (type: CreateMenu) => {
      switch (type) {
        case CreateMenus.EDITOR:
          // 편집 페이지로 전환 시 검증 제한을 초기화한다.
          validator.needValidateAll("validator\\.create\\.");
          navigate("/create");
          break;
        case CreateMenus.PREVIEW:
          if (validator.validation.result !== ValidatedType.VALID) {
            enqueueSnackbar(text(L10N.HEADER_CREATE_04), {
              variant: "error",
              preventDuplicate: true,
            });

            return;
          }

          navigate("/create/preview");
          break;
        case CreateMenus.SAVE:
          if (validator.validation.result !== ValidatedType.VALID) {
            enqueueSnackbar(text(L10N.HEADER_CREATE_05), {
              variant: "error",
              preventDuplicate: true,
            });

            return;
          }

          // SAVE logic
          break;
      }
    },
    [enqueueSnackbar, navigate, validator, text]
  );

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
    
    // 뒤로가기를 통해 다시 되돌아가지 않도록 한다.
    navigate("/", { replace: true });
  }, [editor, navigate]);

  return (
    <>
      <Header
        menu={{
          enum: CreateMenus,
          selected: header.selectedMenu,
          disabled: header.disabledMenus,
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

export { CreateHeader, CreateMenus, CreateHeaderSignature };
