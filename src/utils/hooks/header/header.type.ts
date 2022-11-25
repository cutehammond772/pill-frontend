import * as React from "react";
import { L10NText } from "../../../localization";

type MenuItemRef = HTMLButtonElement | null;
type MenuEnum = { [s: string]: L10NText };
type HeaderContainer = { [header: string]: Array<string> };

// T는 enum element, E는 enum이다.
interface MenuProps<E extends MenuEnum> {
  enum: E;
  selected?: Array<E[keyof E]>;
  disabled?: Array<E[keyof E]>;

  refs: React.MutableRefObject<MenuItemRef[]>;
  onClick: (type: E[keyof E]) => void;
}

export type { MenuItemRef, MenuProps, MenuEnum, HeaderContainer };
