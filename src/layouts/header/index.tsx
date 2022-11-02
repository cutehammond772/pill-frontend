import { useEffect, useRef } from "react";

import { Logo } from "../../components/logo";
import Profile from "../../components/profile";
import { HeaderContent } from "./header.style";

import { TextField } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({
  title,
  noSearchBar = false,
}: {
  title?: string;
  noSearchBar?: boolean;
}) => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 100);

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleScroll = () => {
    if (!!headerRef.current) {
      const percentage = Math.min(window.scrollY, 100);
      headerRef.current.style.background = `rgba(32, 32, 32, ${percentage}%)`;
    }
  }

  return (
    <HeaderContent ref={headerRef}>
      {!!title ? (
        // Header Title이 존재하면 title 표시
        <span>{title}</span>
      ) : (
        // Header Title이 존재하지 않으면 Logo 표시
        <Logo />
      )}

      {!noSearchBar && (
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
    </HeaderContent>
  );
};

export { Header };
