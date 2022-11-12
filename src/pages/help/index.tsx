import * as React from "react";

import { Page } from "../../layouts/page";
import { usePageCheck } from "../../utils/hooks/header/page_check";
import {
  DefaultHeaderSignature,
  DefaultMenu,
} from "../../components/header/default";

import * as Style from "./help.style";

const HelpPage = () => {
  // DefaultHeader에서 Help 아이템을 선택한다.
  usePageCheck(DefaultHeaderSignature, DefaultMenu.HELP);

  return (
    <Page>
      <Style.Container></Style.Container>
    </Page>
  );
};

export { HelpPage };
