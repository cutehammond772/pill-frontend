import * as React from "react";
import { L10NText } from "../../../localization";

const HeaderReducingType = {
  INIT: "reducer.header.INIT",
  CHANGE_TITLE: "reducer.header.CHANGE_TITLE",

  ADD_SELECTED: "reducer.header.ADD_SELECTED",
  ADD_DISABLED: "reducer.header.ADD_DISABLED",

  RESET_SELECTED: "reducer.header.RESET_SELECTED",
  RESET_DISABLED: "reducer.header.RESET_DISABLED",

  LOCK_CLICK: "reducer.header.LOCK_CLICK",
  UNLOCK_CLICK: "reducer.header.UNLOCK_CLICK",
} as const;

const INITIAL_STATE: HeaderNode = {
  selected: {},
  disabled: {},
  preventClick: false,
};

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

interface HeaderNode {
  title?: string;
  preventClick: boolean;

  selected: HeaderContainer;
  disabled: HeaderContainer;
}

export type { HeaderNode, MenuItemRef, MenuProps, MenuEnum, HeaderContainer };
export { INITIAL_STATE, HeaderReducingType };
