import { Header } from "../../layouts/header";
import { Footer } from "../../layouts/footer";
import { Container } from "../../layouts/container";

import { useAuth } from "../../utils/hooks/auth";
import * as Style from "./create.style";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import * as React from "react";
import { useRef } from "react";

import * as NamingPill from "./naming";
import * as MakingPill from "./making";
import { HeaderMenu, MenuItemRef } from "../../layouts/header/menu";

const MenuType = {
  EDITOR: "Editor",
  SAVE: "Save",
  PREVIEW: "Preview",
  HOME: "Home",
} as const;

const CreatePage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const refs = useRef<MenuItemRef[]>([]);

  const handleClick = (type: string) => {};

  // Guest 권한으로 접근할 경우 돌려보낸다.
  useEffect(() => {
    if (!auth.authenticated) {
      /* For Test */
      //navigate("/", { replace: true });
    }
  }, [auth, navigate]);

  return (
    <>
      <Header
        component={{
          component: (
            <HeaderMenu
              enum={MenuType}
              refs={refs}
              checked="Editor"
              onClick={handleClick}
            />
          ),
          refs: refs,
        }}
        title="Create"
      />
      <Container layout={Style.Background}>
        <Style.Container>
          <NamingPill.Content />
          <MakingPill.Content />
        </Style.Container>
      </Container>
      <Footer />
    </>
  );
};

export { CreatePage };
