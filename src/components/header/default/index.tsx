import { Header } from "../../../layouts/header";

import * as React from "react";
import { useHeader } from "../../../utils/hooks/header";

const DefaultHeaderSignature = "DefaultHeader";

const DefaultMenu = {
  HOME: "Home",
  MY_PILL: "My Pill",
  EXPLORE: "Explore",
  ABOUT: "About",
} as const;

const DefaultHeader = () => {
  const header = useHeader<typeof DefaultMenu>(
    DefaultHeaderSignature,
    DefaultMenu.HOME
  );

  const mapper = { [DefaultMenu.HOME]: "", [DefaultMenu.MY_PILL]: "my" };

  return (
    <Header
      title={header.title}
      menu={{
        enum: DefaultMenu,
        refs: header.refs,
        selected: header.selectedItems,
        disabled: header.disabledItems,
        onClick: (item) => header.defaultClickHandler(item, mapper),
      }}
    />
  );
};

export { DefaultHeader, DefaultMenu, DefaultHeaderSignature };
