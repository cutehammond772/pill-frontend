import * as React from "react";
import { useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useResizeObserver from "@react-hook/resize-observer";

import { Logo } from "../../components/logo";
import { Profile } from "../../components/profile";
import * as Style from "./header.style";
import { updateHeaderHeight } from "../../utils/reducers/page";
import { MenuEnum, MenuProps } from "../../utils/hooks/header/header.type";
import { HeaderMenu } from "./menu";
import { RootState } from "../../utils/reducers";

interface HeaderProps<E extends MenuEnum> {
  title?: string;
  onHomeClick?: () => void;
  menu?: MenuProps<E>;
}

const Header = <E extends MenuEnum>(props: HeaderProps<E>) => {
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  const dispatch = useDispatch();

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

  // 첫 로드 시 Header의 height 값을 redux container에 저장한다.
  useEffect(() => {
    !!headerRef?.current &&
      dispatch(
        updateHeaderHeight({ headerHeight: headerRef.current.getBoundingClientRect().height })
      );
  }, [dispatch]);

  // Header의 height 값이 바뀔 때마다 redux container에 갱신한다.
  useResizeObserver(
    headerRef,
    (_) =>
      !!headerRef?.current &&
      dispatch(
        updateHeaderHeight({ headerHeight: headerRef.current.getBoundingClientRect().height })
      )
  );

  // 1. Title의 경우 title 변수가 존재하지 않으면 로고와 함께 Pill로 설정되며, 존재하면 로고 없이 title만 표시된다.
  // 2. props 변수가 존재하지 않으면 메뉴는 표시되지 않는다.
  return (
    <Style.Header ref={headerRef}>
      <Style.Title>
        {!props.title && <Logo onClick={props.onHomeClick} />}
        <span ref={titleRef} className="title">
          {props.title || "Pill"}
        </span>
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
