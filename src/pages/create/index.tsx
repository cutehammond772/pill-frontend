import { useAuth } from "../../utils/hooks/auth";
import * as Style from "./create.style";
import { useEffect, useRef } from "react";

import * as React from "react";

import * as NamingPill from "./naming";
import * as MakingPill from "./making";
import Page from "../../layouts/page";
import { usePageSelect } from "../../utils/hooks/header/page-select";
import {
  CreateHeaderSignature,
  CreateMenus,
} from "../../components/header/create";
import { useValidator } from "../../utils/hooks/validation";

import PillValidator from "../../utils/validators/create/pill";
import { usePillDefaultEditor } from "../../utils/hooks/editor";
import { usePageNavigate } from "../../utils/hooks/page-navigate";

const CreatePage = () => {
  usePageSelect(CreateHeaderSignature, CreateMenus.EDITOR);
  useValidator(PillValidator());

  const auth = useAuth();
  const { navigate } = usePageNavigate();
  const editor = usePillDefaultEditor();

  const inited = useRef<boolean>(false);

  useEffect(() => {
    // Guest 권한으로 접근할 경우 돌려보낸다.
    // if (!auth.authorized) {
    //   navigate("/", true);
    //   return;
    // }

    // 편집을 활성화한다.
    if (!inited.current) {
      if (!editor.available) {
        editor.beginEditor();
      }
      inited.current = true;
    }
  }, [editor, auth.authorized, navigate]);

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
