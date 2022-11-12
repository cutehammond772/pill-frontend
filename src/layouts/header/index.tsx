import * as React from "react";
import { useEffect, useRef, useCallback, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useResizeObserver from "@react-hook/resize-observer";

import { Logo } from "../../components/logo";
import Profile from "../../components/profile";
import * as Style from "./header.style";
import { updateHeaderHeight } from "../../utils/reducers/page";
import { MenuEnum, MenuProps } from "../../utils/reducers/header/header.type";
import { HeaderMenu } from "./menu";
import { RootState } from "../../utils/reducers";

interface HeaderProps<E extends MenuEnum> {
  title?: string;
  menu?: MenuProps<E>;
}

const Header = <E extends MenuEnum>(props: HeaderProps<E>) => {
  // Header의 Background 변경을 담당하는 ref이다.
  const headerRef = useRef<HTMLElement>(null);

  // Title의 TextColor 변경을 담당하는 ref이다.
  const titleRef = useRef<HTMLSpanElement>(null);

  const dispatch = useDispatch();

  // Page 간 트랜지션 과정에서 아이템의 클릭 이벤트를 막기 위해 필요하다.
  const preventClick = useSelector(
    (state: RootState) => state.header.preventClick
  );

  // 대표 컬러 상수이다.
  const light: number = 255;
  const dark: number = 48;

  // 화면 스크롤 시 Header 색상을 동적으로 변경하는 부분을 담당한다.
  const handleScroll = useCallback(() => {
    // 스크롤 값을 나타낸다. (0 ~ 100 범위이며, 100을 초과하면 100으로 표시)
    const percentage = Math.min(window.scrollY, 100);

    const darkToLight = (light * percentage + dark * (100 - percentage)) / 100;
    const LightToDark = (light * (100 - percentage) + dark * percentage) / 100;

    // Header Background
    if (!!headerRef?.current) {
      headerRef.current.style.background = `rgb(${LightToDark}, ${LightToDark}, ${LightToDark})`;
    }

    // Title TextColor
    if (!!titleRef?.current) {
      titleRef.current.style.color = `rgb(${darkToLight}, ${darkToLight}, ${darkToLight})`;
    }

    // MenuItems Color
    if (!!props?.menu?.refs?.current) {
      props.menu.refs.current.forEach((ref) => {
        if (!!ref) {
          ref.style.color = `rgb(${darkToLight}, ${darkToLight}, ${darkToLight})`;
          ref.style.backgroundColor = `rgb(${LightToDark}, ${LightToDark}, ${LightToDark})`;
        }
      });
    }
  }, [props?.menu?.refs]);

  // 특정 함수를 호출하기 전에 아이템의 클릭 이벤트 허용 여부를 확인한다.
  const checkPrevention = useCallback(
    <T extends Function>(callback: T) => {
      if (preventClick) return () => {};

      return callback;
    },
    [preventClick]
  );

  // Scroll EventHander를 설정한다.
  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 50);

    handleScroll();

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // 첫 로드 시 Header의 height 값을 redux container에 저장한다.
  useLayoutEffect(() => {
    if (!!headerRef?.current) {
      dispatch(
        updateHeaderHeight(headerRef.current.getBoundingClientRect().height)
      );
    }
  }, [dispatch]);

  // Header의 height 값이 바뀔 때마다 redux container에 갱신한다.
  useResizeObserver(headerRef, (_) => {
    if (!!headerRef?.current) {
      dispatch(
        updateHeaderHeight(headerRef.current.getBoundingClientRect().height)
      );
    }
  });

  // 1. Title의 경우 title 변수가 존재하지 않으면 로고와 함께 Pill로 설정되며, 존재하면 로고 없이 title만 표시된다.
  // 2. props 변수가 존재하지 않으면 메뉴는 표시되지 않는다.
  return (
    <Style.Header ref={headerRef}>
      <Style.Title>
        {!props.title && <Logo />}
        <span ref={titleRef}>{props.title || "Pill"}</span>
      </Style.Title>

      {!!props?.menu && (
        <HeaderMenu
          {...{ ...props.menu, onClick: checkPrevention(props.menu.onClick) }}
        />
      )}

      <Profile />
    </Style.Header>
  );
};

export { Header };
