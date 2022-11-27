import * as React from "react";

import { Page } from "../../layouts/page";
import { usePageSelect } from "../../utils/hooks/header/page-select";
import {
  DefaultHeaderSignature,
  DefaultMenu,
} from "../../components/header/default";

import * as Style from "./about.style";

const AboutPage = () => {
  usePageSelect(DefaultHeaderSignature, DefaultMenu.ABOUT);

  return (
    <Page>
      <Style.Container></Style.Container>
    </Page>
  );
};

export { AboutPage };
