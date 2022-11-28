import { L10NText } from "../../../localization";

export type MenuRef = HTMLButtonElement | null;
export type Menus = { [s: string]: L10NText };
export type DisabledMenus = { [header: string]: Array<string> };
export type SelectedMenu = { [header: string]: string };

// T는 enum element, E는 enum이다.
export interface MenuProps<E extends Menus> {
  enum: E;
  selected?: E[keyof E];
  disabled?: Array<E[keyof E]>;

  onClick: (type: E[keyof E]) => void;
}
