import * as React from "react";

import * as Style from "./menu.style";

// T는 enum element, E는 enum이다.
interface HeaderMenuProps<E extends { [s: string]: string }> {
  enum: E;
  checked?: E[keyof E];
  exclude?: Array<E[keyof E]>;

  refs: React.MutableRefObject<MenuItemRef[]>;
  onClick: (type: string) => void;
}

type MenuItemRef = HTMLButtonElement | null;

const HeaderMenu = <E extends { [s: string]: string }>(
  props: HeaderMenuProps<E>
) => {
  const components = Object.values(props.enum).filter(
    (value) => !props?.exclude?.find((exclude) => exclude === value)
  );

  return (
    <Style.Menu>
      {components.map((value, index) => (
        <Style.MenuItem
          ref={(ref) => (props.refs.current[index] = ref)}
          key={index}
          checked={props?.checked === value}
          {...(props?.checked !== value && {
            onClick: () => props.onClick(value),
          })}
        >
          {value}
        </Style.MenuItem>
      ))}
    </Style.Menu>
  );
};

export { HeaderMenu, type MenuItemRef };
