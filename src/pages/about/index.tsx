import * as React from "react";

import { Page } from "../../layouts/page";
import { usePageSelect } from "../../utils/hooks/header/page-select";
import {
  DefaultHeaderSignature,
  DefaultMenus,
} from "../../components/header/default";

import * as Style from "./about.style";

const AboutPage = () => {
  usePageSelect(DefaultHeaderSignature, DefaultMenus.ABOUT);

  return (
    <Page>
      <Style.Container></Style.Container>
    </Page>
  );
};

export default AboutPage;
