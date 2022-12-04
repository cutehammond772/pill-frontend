import * as React from "react";
import { useRef, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useResizeObserver from "@react-hook/resize-observer";

import { Profile } from "../../components/profile";
import { Actions as actions } from "../../utils/reducers/page/size";
import { Menus, MenuProps } from "../../utils/hooks/header/header.type";
import HeaderMenu from "./menu/default";
import { RootState } from "../../utils/reducers";

import * as Style from "./header.style";
import Logo from "./logo";
import PillMenu from "./menu/pill";
import { useI18n } from "../../utils/hooks/i18n";
import { I18N } from "../../utils/i18n";
import { usePageNavigate } from "../../utils/hooks/page-navigate";

interface HeaderProps<E extends Menus> {
  onHomeClick?: () => void;
  homeMenuOnDropdown?: boolean;
  menu: MenuProps<E>;
}

const Header = <E extends Menus>(props: HeaderProps<E>) => {
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const { navigate } = usePageNavigate();
  const { text } = useI18n();

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
    <T extends Function>(callbackFn: T) =>
      preventClick ? () => {} : callbackFn,
    [preventClick]
  );

  const handleDropdownMenu = useCallback(
    (menu: E[keyof E]) => {
      checkPrevention(() => {
        // 메뉴를 누를 때마다 드롭다운이 닫히는 효과를 준다.
        setDropdown(false);
        props.menu.onClick(menu);
      })();
    },
    [checkPrevention, props.menu]
  );

  const handleBackToHomeMenu = useCallback(
    () =>
      checkPrevention(() => {
        (props.onHomeClick || (() => navigate("/")))();
      })(),
    [checkPrevention, navigate, props.onHomeClick]
  );

  useEffect(() => {
    if (!dropdownRef.current) {
      return;
    }

    let dropdownHeight = menus.length * 60 - 20;
    !!props.homeMenuOnDropdown && (dropdownHeight += 60);

    dropdownRef.current.style.height = dropdown ? `${dropdownHeight}px` : "0px";
    dropdownRef.current.style.paddingBottom = dropdown ? "20px" : "0px";
  }, [menus, dropdown, props.homeMenuOnDropdown]);

  useEffect(() => {
    !!headerRef?.current &&
      dispatch(
        actions.updateHeaderHeight({
          headerHeight: headerRef.current.getBoundingClientRect().height,
        })
      );
  }, [dispatch]);

  useResizeObserver(
    headerRef,
    (_) =>
      !!headerRef?.current &&
      dispatch(
        actions.updateHeaderHeight({
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
          title={text(props.menu?.selected || I18N.HEADER_01)}
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
              key={menu}
            >
              {text(menu)}
            </div>
          );
        })}
        {!!props.homeMenuOnDropdown && (
          <div className="menu" onClick={handleBackToHomeMenu}>
            {text(I18N.HEADER_02)}
          </div>
        )}
      </div>
    </Style.Header>
  );
};

export { Header };
