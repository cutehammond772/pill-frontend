import { Header } from "../../../layouts/header";

import * as React from "react";
import { useHeader } from "../../../utils/hooks/header";
import { L10N } from "../../../localization";
import { MenuEnum } from "../../../utils/hooks/header/header.type";

const DefaultHeaderSignature = "DefaultHeader";

const DefaultMenu: MenuEnum = {
  HOME: L10N.HEADER_DEFAULT_01,
  MY_PILL: L10N.HEADER_DEFAULT_02,
  EXPLORE: L10N.HEADER_DEFAULT_03,
  ABOUT: L10N.HEADER_DEFAULT_04,
} as const;

const DefaultHeader = () => {
  const header = useHeader<typeof DefaultMenu>(
    DefaultHeaderSignature,
    DefaultMenu.HOME
  );

  const mapper = {
    [DefaultMenu.HOME]: "",
    [DefaultMenu.MY_PILL]: "my",
    [DefaultMenu.EXPLORE]: "explore",
    [DefaultMenu.ABOUT]: "about",
  };

  return (
    <Header
      title={header.title}
      menu={{
        enum: DefaultMenu,
        selected: header.selectedItems,
        disabled: header.disabledItems,
        onClick: (item) => header.getSimpleLinkHandler(item, mapper),
      }}
    />
  );
};

export { DefaultHeader, DefaultMenu, DefaultHeaderSignature };
