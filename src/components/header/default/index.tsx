import { Header } from "../../../layouts/header";

import * as React from "react";
import { useHeader } from "../../../utils/hooks/header";

const DefaultHeaderSignature = "DefaultHeader";

const DefaultMenu = {
  HOME: "Home",
  BOARD: "Board",
  SEARCH: "Search",
  HELP: "Help",
} as const;

const DefaultHeader = () => {
  const header = useHeader<typeof DefaultMenu>(
    DefaultHeaderSignature,
    DefaultMenu.HOME
  );

  const mapper = { [DefaultMenu.HOME]: "" };

  return (
    <Header
      title={header.title}
      menu={{
        enum: DefaultMenu,
        refs: header.refs,
        checked: header.checkedItems,
        disabled: header.disabledItems,
        onClick: (item) => header.defaultClickHandler(item, mapper),
      }}
    />
  );
};

export { DefaultHeader, DefaultMenu, DefaultHeaderSignature };
