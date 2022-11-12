import { Header } from "../../../layouts/header";

import * as React from "react";
import { useHeader } from "../../../utils/hooks/header";

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
  
  const handleClick = (type: CreateMenuItem) => {};

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
