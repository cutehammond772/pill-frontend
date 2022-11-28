import { Header } from "../../../layouts/header";

import * as React from "react";
import { useHeader } from "../../../utils/hooks/header";
import { L10N } from "../../../localization";
import { Menus } from "../../../utils/hooks/header/header.type";

export const DefaultHeaderSignature = "DefaultHeader";

export const DefaultMenus: Menus = {
  HOME: L10N.HEADER_DEFAULT_01,
  MY_PILL: L10N.HEADER_DEFAULT_02,
  EXPLORE: L10N.HEADER_DEFAULT_03,
  ABOUT: L10N.HEADER_DEFAULT_04,
} as const;

const mapper = {
  [DefaultMenus.HOME]: "",
  [DefaultMenus.MY_PILL]: "my",
  [DefaultMenus.EXPLORE]: "explore",
  [DefaultMenus.ABOUT]: "about",
};

const DefaultHeader = () => {
  const header = useHeader<typeof DefaultMenus>(
    DefaultHeaderSignature,
    DefaultMenus.HOME
  );

  return (
    <Header
      menu={{
        enum: DefaultMenus,
        selected: header.selectedMenu,
        disabled: header.disabledMenus,
        onClick: (menu) => header.getSimpleLinkHandler(menu, mapper),
      }}
    />
  );
};

export default DefaultHeader;
