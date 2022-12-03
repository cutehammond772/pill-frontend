import { Header } from "../../../layouts/header";

import * as React from "react";
import { useHeader } from "../../../utils/hooks/header";
import { I18N } from "../../../utils/i18n";
import { Menus } from "../../../utils/hooks/header/header.type";

export const DefaultHeaderSignature = "DefaultHeader";

export const DefaultMenus: Menus = {
  HOME: I18N.HEADER_DEFAULT_01,
  MY_PILL: I18N.HEADER_DEFAULT_02,
  EXPLORE: I18N.HEADER_DEFAULT_03,
} as const;

const mapper = {
  [DefaultMenus.HOME]: "",
  [DefaultMenus.MY_PILL]: "my",
  [DefaultMenus.EXPLORE]: "explore",
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
