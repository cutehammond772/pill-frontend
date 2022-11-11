import { Header } from "../../../layouts/header";

import * as React from "react";
import { useHeader } from "../../../utils/hooks/header";

const CreateHeaderSignature = "CreateHeader";

const CreateMenu = {
  EDITOR: "Editor",
  SAVE: "Save",
  PREVIEW: "Preview",
  HOME: "Home",
} as const;

const CreateHeader = () => {
  const header = useHeader<typeof CreateMenu>(
    CreateHeaderSignature,
    CreateMenu.EDITOR
  );

  return (
    <Header
      title={header.title}
      menu={{
        enum: CreateMenu,
        refs: header.refs,
        checked: header.checkedItems,
        disabled: header.disabledItems,
        onClick: (type: typeof CreateMenu[keyof typeof CreateMenu]) => {},
      }}
    />
  );
};

export { CreateHeader, CreateMenu, CreateHeaderSignature };
