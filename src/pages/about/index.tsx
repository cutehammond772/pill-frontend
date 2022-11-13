import * as React from "react";

import { Page } from "../../layouts/page";
import { usePageCheck } from "../../utils/hooks/header/page_check";
import {
  DefaultHeaderSignature,
  DefaultMenu,
} from "../../components/header/default";

import * as Style from "./about.style";

const AboutPage = () => {
  // DefaultHeader에서 Help 아이템을 선택한다.
  usePageCheck(DefaultHeaderSignature, DefaultMenu.ABOUT);

  return (
    <Page>
      <Style.Container></Style.Container>
    </Page>
  );
};

export { AboutPage };
