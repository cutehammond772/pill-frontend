import { useAuth } from "../../utils/hooks/auth";
import * as Style from "./create.style";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import * as React from "react";

import * as NamingPill from "./naming";
import * as MakingPill from "./making";
import { Page } from "../../layouts/page";
import { usePageCheck } from "../../utils/hooks/header/page_check";
import { CreateHeaderSignature, CreateMenu } from "../../components/header/create";

const CreatePage = () => {
  // CreateHeader에서 Preview 아이템을 선택한다.
  usePageCheck(CreateHeaderSignature, CreateMenu.EDITOR);

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
    <Page layout={Style.Background}>
      <Style.Container>
        <NamingPill.Content />
        <MakingPill.Content />
      </Style.Container>
    </Page>
  );
};

export { CreatePage };
