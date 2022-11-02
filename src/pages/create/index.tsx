import { Header } from "../../layouts/header";
import { Footer } from "../../layouts/footer";
import { Container } from "../../layouts/container";

import { useAuth } from "../../utils/hooks/auth";
import { ContentStyle } from "./create.style";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import * as React from "react";

import * as NamingPill from "./naming";
import * as MakingPill from "./making";

const CreatePage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  // Guest 권한으로 접근할 경우 돌려보낸다.
  useEffect(() => {
    if (!auth.authenticated) {
      /* For Test */
      //navigate("/", { replace: true });
    }
  }, [auth, navigate]);

  return (
    <Container>
      <Header title="Create" noSearchBar />
      <ContentStyle>
        <NamingPill.Content />
        <MakingPill.Content />
      </ContentStyle>
      <Footer />
    </Container>
  );
};

export { CreatePage };
