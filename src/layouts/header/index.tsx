import * as React from "react";
import { useEffect, useRef, useCallback } from "react";

import { Logo } from "../../components/logo";
import Profile from "../../components/profile";
import * as Style from "./header.style";
import { MenuItemRef } from "./menu";

interface HeaderProps {
  title?: string;

  component?: {
    // Header 가운데에 들어갈 컴포넌트이다.
    component: React.ReactElement;

    // 위 컴포넌트에 반영되는 ref이다.
    refs: React.MutableRefObject<MenuItemRef[]>;
  };
}

const Header = (props: HeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  const light: number = 255;
  const dark: number = 48;

  const handleScroll = useCallback(() => {
    const percentage = Math.min(window.scrollY, 100);
    const color = (light * percentage + dark * (100 - percentage)) / 100;
    const headerColor = (light * (100 - percentage)+ dark * percentage) / 100;

    if (!!headerRef?.current) {
      headerRef.current.style.background = `rgb(${headerColor}, ${headerColor}, ${headerColor})`;
    }

    if (!!titleRef?.current) {
      titleRef.current.style.color = `rgb(${color}, ${color}, ${color})`;
    }

    if (!!props?.component?.refs?.current) {
      props.component.refs.current.forEach(
        (ref) => {
          if (!!ref) {
            ref.style.color = `rgb(${color}, ${color}, ${color})`;
            ref.style.backgroundColor = `rgb(${headerColor}, ${headerColor}, ${headerColor})`;
          }
        }
      );
    }
  }, [props.component]);

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

  return (
    <Style.Header ref={headerRef}>
      <Style.Title>
        {!props.title && <Logo />}
        <span ref={titleRef}>{props.title || "Pill"}</span>
      </Style.Title>
      {props?.component?.component}
      <Profile />
    </Style.Header>
  );
};

export { Header };
