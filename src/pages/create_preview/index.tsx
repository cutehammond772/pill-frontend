import * as React from "react";
import {
  CreateHeaderSignature,
  CreateMenu,
} from "../../components/header/create";

import { Page } from "../../layouts/page";
import { usePageCheck } from "../../utils/hooks/header/page_check";

import * as Style from "./create_preview.style";

const CreatePreviewPage = () => {
  // CreateHeader에서 Preview 아이템을 선택한다.
  usePageCheck(CreateHeaderSignature, CreateMenu.PREVIEW);

  return (
    <Page>
      <Style.Container></Style.Container>
    </Page>
  );
};

export { CreatePreviewPage };
