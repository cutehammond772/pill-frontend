import { useAuth } from "../../utils/hooks/auth";
import * as Style from "./create.style";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import * as React from "react";

import * as NamingPill from "./naming";
import * as MakingPill from "./making";
import { Page } from "../../layouts/page";
import { usePageSelect } from "../../utils/hooks/header/page-select";
import { CreateHeaderSignature, CreateMenus } from "../../components/header/create";
import { useValidation } from "../../utils/hooks/validation";

import * as Pill from "../../utils/validators/create/pill";
import { usePillDefaultEditor } from "../../utils/hooks/creator";

const CreatePage = () => {
  // CreateHeader에서 Preview 아이템을 선택한다.
  usePageSelect(CreateHeaderSignature, CreateMenus.EDITOR);
  const editor = usePillDefaultEditor();
  const validator = useValidation(Pill.Validator);

  const auth = useAuth();
  const navigate = useNavigate();

  // Guest 권한으로 접근할 경우 돌려보낸다.
  useEffect(() => {
    if (!auth.authorized) {
      /* For Test */
      //navigate("/", { replace: true });
    }
  }, [auth, navigate]);

  useEffect(() => {
    if (!editor.available) {
      editor.beginEditor();
    }
  }, [editor]);

  return (
    <Page layout={Style.Background}>
      <Style.Container>
        <NamingPill.Content />
        <MakingPill.Content />
      </Style.Container>
    </Page>
  );
};

export default CreatePage;
