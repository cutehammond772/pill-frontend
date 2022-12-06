
import * as React from "react";
import { useEffect, useCallback } from "react";

import Header from "../../../layouts/header";
import { useHeader } from "../../../utils/hooks/header";
import { useSnackbar } from "notistack";
import { Menus } from "../../../utils/hooks/header/header.type";
import { I18N } from "../../../utils/i18n";
import { useI18n } from "../../../utils/hooks/i18n";
import { useGetValidation } from "../../../utils/hooks/validation";

import PillValidator from "../../../utils/validators/create/pill";
import { usePageNavigate } from "../../../utils/hooks/page-navigate";
import { useModal } from "../../../utils/hooks/modal";
import { ModalTypes } from "../../../layouts/modal/modal.type";

export const CreateHeaderSignature = "CreateHeader";

export const CreateMenus: Menus = {
  EDITOR: I18N.HEADER_CREATE_01,
  PREVIEW: I18N.HEADER_CREATE_02,
  SAVE: I18N.HEADER_CREATE_03,
} as const;

type CreateMenu = typeof CreateMenus[keyof typeof CreateMenus];

const CreateHeader = () => {
  const { text } = useI18n();
  const { navigate } = usePageNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const create = useModal(ModalTypes.CREATE_CONFIRM, {});

  const header = useHeader<typeof CreateMenus>(
    CreateHeaderSignature,
    CreateMenus.EDITOR
  );

  const validation = useGetValidation(PillValidator());
  const valid = validation.validated && validation.validation.valid;

  const handleClick = useCallback(
    (type: CreateMenu) => {
      switch (type) {
        case CreateMenus.EDITOR:
          navigate("/create");
          break;
        case CreateMenus.PREVIEW:
          if (!valid) {
            enqueueSnackbar(text(I18N.HEADER_CREATE_04), {
              variant: "error",
              preventDuplicate: true,
            });

            return;
          }

          navigate("/create/preview");
          break;
        case CreateMenus.SAVE:
          if (!valid) {
            enqueueSnackbar(text(I18N.HEADER_CREATE_05), {
              variant: "error",
              preventDuplicate: true,
            });

            return;
          }

          // SAVE logic
          break;
      }
    },
    [navigate, enqueueSnackbar, text, valid]
  );

  const preventClose = useCallback((event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = "";
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", preventClose);
    return () => window.removeEventListener("beforeunload", preventClose);
  }, [preventClose]);

  return (
    <Header
      menu={{
        enum: CreateMenus,
        selected: header.selectedMenu,
        disabled: header.disabledMenus,
        onClick: handleClick,
      }}
      onHomeClick={create}
      homeMenuOnDropdown
    />
  );
};

export default CreateHeader;
