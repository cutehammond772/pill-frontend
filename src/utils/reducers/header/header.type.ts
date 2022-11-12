import * as React from "react";

const HeaderReducingType = {
  INIT: "reducer.header.init",
  CHANGE_TITLE: "reducer.header.change.title",

  ADD_CHECKED: "reducer.header.add.checked",
  ADD_DISABLED: "reducer.header.add.disabled",

  RESET_CHECKED: "reducer.header.reset.checked",
  RESET_DISABLED: "reducer.header.reset.disabled",

  LOCK_CLICK: "reducer.header.lock.click",
  UNLOCK_CLICK: "reducer.header.unlock.click",
} as const;

const INITIAL_STATE: HeaderNode = {
  checked: {},
  disabled: {},
  preventClick: false,
};

type MenuItemRef = HTMLButtonElement | null;
type MenuEnum = { [s: string]: string };

// T는 enum element, E는 enum이다.
interface MenuProps<E extends MenuEnum> {
  enum: E;
  checked?: Array<E[keyof E]>;
  disabled?: Array<E[keyof E]>;

  refs: React.MutableRefObject<MenuItemRef[]>;
  onClick: (type: E[keyof E]) => void;
}

interface HeaderNode {
  title?: string;
  preventClick: boolean;

  checked: { [name: string]: Array<string> };
  disabled: { [name: string]: Array<string> };
}

export type { HeaderNode, MenuItemRef, MenuProps, MenuEnum };
export { INITIAL_STATE, HeaderReducingType };
