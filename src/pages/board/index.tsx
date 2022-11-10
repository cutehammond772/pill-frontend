import { Header } from "../../layouts/header";
import { Footer } from "../../layouts/footer";
import { Container } from "../../layouts/container";

import * as React from "react";
import { useRef } from "react";
import { HeaderMenu, MenuItemRef } from "../../layouts/header/menu";

const MenuType = {
  RECENT: "Recent",
  MOST_LIKED: "Most Liked",
  CATEGORIES: "Categories",
  SEARCH: "Search",
} as const;

const BoardPage = () => {
  const refs = useRef<MenuItemRef[]>([]);

  const handleClick = (type: string) => {};

  return (
    <>
      <Header
        component={{
          component: (
            <HeaderMenu
              enum={MenuType}
              refs={refs}
              checked="Recent"
              onClick={handleClick}
            />
          ),
          refs: refs,
        }}
      />
      <Container></Container>
      <Footer />
    </>
  );
};

export { BoardPage };
