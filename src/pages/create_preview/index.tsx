import * as React from "react";
import {
  CreateHeaderSignature,
  CreateMenu,
} from "../../components/header/create";

import { Page } from "../../layouts/page";
import { usePageSelect } from "../../utils/hooks/header/page_select";

import * as Style from "./create_preview.style";

const CreatePreviewPage = () => {
  // CreateHeader에서 Preview 아이템을 선택한다.
  usePageSelect(CreateHeaderSignature, CreateMenu.PREVIEW);

  return (
    <Page>
      <Style.Container></Style.Container>
    </Page>
  );
};

export { CreatePreviewPage };
