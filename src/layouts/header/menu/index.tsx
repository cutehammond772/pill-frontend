import * as React from "react";
import {
  MenuEnum,
  MenuProps,
} from "../../../utils/reducers/header/header.type";

import * as Style from "./menu.style";

const HeaderMenu = <E extends MenuEnum>(props: MenuProps<E>) => {
  // 메뉴를 구성하는 아이템의 이름들이다.
  const items = Object.values(props.enum).filter(
    (item) => !props?.disabled?.find((disabled) => disabled === item)
  );

  return (
    <Style.Menu>
      {items.map((item, index) => {
        const checked = !!props?.checked?.find((checked) => checked === item);

        return (
          <Style.MenuItem
            ref={(ref) => (props.refs.current[index] = ref)}
            key={index}
            checked={checked}
            {...(!checked && {
              // 굳이 타입을 강제로 설정하지 않아도 가능하도록 방법을 강구할 필요가 있다.
              onClick: () => {
                props.onClick(item as E[keyof E]);
              },
            })}
          >
            {item}
          </Style.MenuItem>
        );
      })}
    </Style.Menu>
  );
};

export { HeaderMenu };
