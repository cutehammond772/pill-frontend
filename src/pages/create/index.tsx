import { Header } from "../../layouts/header";
import { Footer } from "../../layouts/footer";
import { Container } from "../../layouts/container";

import { useAuth } from "../../utils/hooks/auth";
import { ContentsStyle } from "./create.style";
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
    <>
      <Header title="Create Pill" noSearchBar />
      <Container>
        <ContentsStyle>
          <NamingPill.Content />
          <MakingPill.Content />
        </ContentsStyle>
      </Container>
      <Footer />
    </>
  );
};

export { CreatePage };
