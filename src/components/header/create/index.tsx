import { Header } from "../../../layouts/header";

import * as React from "react";
import { useHeader } from "../../../utils/hooks/header";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const handleClick = (type: CreateMenuItem) => {
    switch(type) {
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

  return (
    <Header
      title={header.title}
      menu={{
        enum: CreateMenu,
        refs: header.refs,
        checked: header.checkedItems,
        disabled: header.disabledItems,
        onClick: handleClick,
      }}
    />
  );
};

export { CreateHeader, CreateMenu, CreateHeaderSignature };
