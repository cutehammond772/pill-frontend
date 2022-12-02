import { useAuth } from "../../utils/hooks/auth";
import * as Style from "./create.style";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import * as React from "react";

import * as NamingPill from "./naming";
import * as MakingPill from "./making";
import { Page } from "../../layouts/page";
import { usePageSelect } from "../../utils/hooks/header/page-select";
import {
  CreateHeaderSignature,
  CreateMenus,
} from "../../components/header/create";
import { useValidation } from "../../utils/hooks/validation";

import PillValidator from "../../utils/validators/create/pill";
import { usePillDefaultEditor } from "../../utils/hooks/editor";

const CreatePage = () => {
  usePageSelect(CreateHeaderSignature, CreateMenus.EDITOR);
  const validator = useValidation(PillValidator());

  const auth = useAuth();
  const navigate = useNavigate();
  const editor = usePillDefaultEditor();

  const inited = useRef<boolean>(false);

  // Guest 권한으로 접근할 경우 돌려보낸다.
  useEffect(() => {
    if (!auth.authorized) {
      /* For Test */
      //navigate("/", { replace: true });
    }
  }, [auth, navigate]);

  useEffect(() => {
    if (!inited.current) {
      if (!editor.available) {
        editor.beginEditor();
      }
      inited.current = true;
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
