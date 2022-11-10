import { Header } from "../../layouts/header";
import { Footer } from "../../layouts/footer";
import { Container } from "../../layouts/container";

import { useAuth } from "../../utils/hooks/auth";

import { UserHome } from "./user";
import { GuestHome } from "./guest";

import * as React from "react";
import { useRef } from "react";

import * as GuestStyle from "./guest/guest.style";
import * as UserStyle from "./user/user.style";
import { HeaderMenu, MenuItemRef } from "../../layouts/header/menu";
import { useNavigate } from "react-router-dom";

const MenuType = {
  HOME: "Home",
  BOARD: "Board",
  SEARCH: "Search",
  HELP: "Help",
} as const;

const HomePage = () => {
  const auth = useAuth();
  const refs = useRef<MenuItemRef[]>([]);
  const navigate = useNavigate();

  const handleClick = (type: string) => {
    switch(type) {
      case MenuType.BOARD:
        navigate("/board", { preventScrollReset: true });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Header
        component={{
          component: <HeaderMenu enum={MenuType} refs={refs} checked="Home" onClick={handleClick}/>,
          refs: refs,
        }}
      />
      <Container {...{ layout: auth.authenticated ? UserStyle.Background : GuestStyle.Background }}>
        {auth.authenticated ? <UserHome /> : <GuestHome />}
      </Container>
      <Footer />
    </>
  );
};

export { HomePage };
