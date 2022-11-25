import * as React from "react";
import { useLocalization } from "../../../utils/hooks/localization";
import {
  MenuEnum,
  MenuProps,
} from "../../../utils/hooks/header/header.type";

import * as Style from "./menu.style";

const HeaderMenu = <E extends MenuEnum>(props: MenuProps<E>) => {
  const { text } = useLocalization();
  // 메뉴를 구성하는 아이템의 이름들이다.
  const items = Object.values(props.enum).filter(
    (item) => !props?.disabled?.find((disabled) => disabled === item)
  );

  return (
    <Style.Menu>
      {items.map((item, index) => {
        const selected = !!props?.selected?.find((selected) => selected === item);

        return (
          <Style.MenuItem
            ref={(ref) => (props.refs.current[index] = ref)}
            key={index}
            selected={selected}
            {...(!selected && {
              // 굳이 타입을 강제로 설정하지 않아도 가능하도록 방법을 강구할 필요가 있다.
              onClick: () => {
                props.onClick(item as E[keyof E]);
              },
            })}
          >
            {text(item)}
          </Style.MenuItem>
        );
      })}
    </Style.Menu>
  );
};

export { HeaderMenu };
