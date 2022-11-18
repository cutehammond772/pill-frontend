import { Header } from "../../../layouts/header";

import * as React from "react";
import { useEffect, useState } from "react";

import { useHeader } from "../../../utils/hooks/header";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "./modal";

const CreateHeaderSignature = "CreateHeader";

const CreateMenu = {
  EDITOR: "Editor",
  PREVIEW: "Preview",
  SAVE: "Save",
} as const;

const CreateHeader = () => {
  type CreateMenuItem = typeof CreateMenu[keyof typeof CreateMenu];

  const header = useHeader<typeof CreateMenu>(
    CreateHeaderSignature,
    CreateMenu.EDITOR
  );

  const [exitConfirm, setExitConfirm] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleClick = (type: CreateMenuItem) => {
    switch (type) {
      case CreateMenu.EDITOR:
        navigate("/create");
        break;
      case CreateMenu.PREVIEW:
        navigate("/create/preview");
        break;
      case CreateMenu.SAVE:
        break;
    }
  };

  const preventClose = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", preventClose);
    return () => window.removeEventListener("beforeunload", preventClose);
  }, []);

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
        onHomeClick={() => setExitConfirm(true)}
      />
      <ConfirmModal
        open={exitConfirm}
        onClose={() => setExitConfirm(false)}
        onConfirm={() => navigate("/")}
      />
    </>
  );
};

export { CreateHeader, CreateMenu, CreateHeaderSignature };
