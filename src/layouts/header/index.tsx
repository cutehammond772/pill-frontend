import { useEffect, useRef } from "react";

import { Logo } from "../../components/logo";
import Profile from "../../components/profile";
import { HeaderStyle } from "./header.style";

import { TextField } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";

interface HeaderProps {
  title?: string;
  noSearchBar?: boolean;
}

const Header = (props: HeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  const light: number = 221;
  const dark: number = 32;

  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 50);

    handleScroll();

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleScroll = () => {
    if (!!headerRef.current && !!titleRef.current) {
      const percentage = Math.min(window.scrollY, 100);
      const color = (light * percentage + dark * (100 - percentage)) / 100;

      headerRef.current.style.background = `rgba(${dark}, ${dark}, ${dark}, ${percentage}%)`;
      titleRef.current.style.color = `rgb(${color}, ${color}, ${color})`;
    }
  }

  return (
    <HeaderStyle ref={headerRef}>
      {!!props.title ? (
        // Header Title이 존재하면 title 표시
        <span ref={titleRef}>{props.title}</span>
      ) : (
        // Header Title이 존재하지 않으면 Logo 표시
        <Logo />
      )}

      {!(props.noSearchBar || false) && (
        <TextField
          placeholder="Search anything"
          variant="outlined"
          startDecorator={<SearchIcon />}
          sx={{
            height: "30px",
          }}
        />
      )}

      <Profile />
    </HeaderStyle>
  );
};

export { Header };
