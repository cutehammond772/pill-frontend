import * as React from "react";
import { useRef, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useResizeObserver from "@react-hook/resize-observer";

import { Profile } from "../../components/profile";
import { updateHeaderHeight } from "../../utils/reducers/page";
import { Menus, MenuProps } from "../../utils/hooks/header/header.type";
import HeaderMenu from "./menu/default";
import { RootState } from "../../utils/reducers";
import { useNavigate } from "react-router-dom";

import * as Style from "./header.style";
import Logo from "./logo";
import PillMenu from "./menu/pill";
import { useLocalization } from "../../utils/hooks/l10n";
import { L10N } from "../../localization";

interface HeaderProps<E extends Menus> {
  onHomeClick?: () => void;
  menu: MenuProps<E>;
}

const Header = <E extends Menus>(props: HeaderProps<E>) => {
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { text } = useLocalization();

  const [dropdown, setDropdown] = useState<boolean>(false);
  const menus = Object.values(props.menu.enum).filter(
    (menu) => !props.menu.disabled?.includes(menu as E[keyof E])
  );

  // Page 간 트랜지션 과정에서 아이템의 클릭 이벤트를 막기 위해 필요하다.
  const preventClick = useSelector(
    (state: RootState) => state.header.preventClick
  );

  // 특정 함수를 호출하기 전에 아이템의 클릭 이벤트 허용 여부를 확인한다.
  const checkPrevention = useCallback(
    <T extends Function>(callback: T) => {
      if (preventClick) return () => {};

      return callback;
    },
    [preventClick]
  );

  const handleDropdownMenu = useCallback(
    (menu: E[keyof E]) => {
      checkPrevention(() => {
        setDropdown(false);
        props.menu.onClick(menu);
      })();
    },
    [checkPrevention, props.menu]
  );

  useEffect(() => {
    if (!dropdownRef.current) {
      return;
    }

    dropdownRef.current.style.height = dropdown
      ? `${menus.length * 60 - 20}px`
      : "0px";
    dropdownRef.current.style.paddingBottom = dropdown ? "20px" : "0px";
  }, [menus, dropdown]);

  useEffect(() => {
    !!headerRef?.current &&
      dispatch(
        updateHeaderHeight({
          headerHeight: headerRef.current.getBoundingClientRect().height,
        })
      );
  }, [dispatch]);

  useResizeObserver(
    headerRef,
    (_) =>
      !!headerRef?.current &&
      dispatch(
        updateHeaderHeight({
          headerHeight: headerRef.current.getBoundingClientRect().height,
        })
      )
  );

  return (
    <Style.Header ref={headerRef}>
      {!!props?.menu && (
        <HeaderMenu
          {...{ ...props.menu, onClick: checkPrevention(props.menu.onClick) }}
        />
      )}

      <div className="default-menu">
        <Logo onClick={props.onHomeClick || (() => navigate("/"))} />
        <PillMenu
          onClick={() => setDropdown(!dropdown)}
          title={text(props.menu?.selected || L10N.HEADER_01)}
        />
        <Profile />
      </div>

      <div className="dropdown-menu" ref={dropdownRef}>
        {menus.map((menu) => {
          return (
            <div
              className={`${
                props.menu.selected === menu ? "selected-menu" : "menu"
              }`}
              onClick={() => handleDropdownMenu(menu as E[keyof E])}
            >
              {text(menu)}
            </div>
          );
        })}
      </div>
    </Style.Header>
  );
};

export { Header };
