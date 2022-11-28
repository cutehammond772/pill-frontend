import * as React from "react";
import { useI18n } from "../../../../utils/hooks/i18n";
import { Menus, MenuProps } from "../../../../utils/hooks/header/header.type";

import * as Style from "./menu.style";

const HeaderMenu = <E extends Menus>(props: MenuProps<E>) => {
  const { text } = useI18n();

  // 이 Header의 메뉴를 나타낸다.
  const menus = Object.values(props.enum).filter(
    (menu) => !props?.disabled?.includes(menu as E[keyof E])
  );

  return (
    <Style.Container>
      {menus.map((menu) => {
        return (
          <Style.Menu
            key={menu}
            selected={props.selected === menu}
            {...(props.selected !== menu && {
              onClick: () => {
                props.onClick(menu as E[keyof E]);
              },
            })}
          >
            {text(menu)}
          </Style.Menu>
        );
      })}
    </Style.Container>
  );
};

export default HeaderMenu;
