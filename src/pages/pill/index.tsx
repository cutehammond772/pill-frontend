import * as React from "react";

import { Page } from "../../layouts/page";
import { useParams } from "react-router-dom";

import * as Style from "./pill.style";

const PillPage = () => {
  const { pillID } = useParams();

  return (
    <Page>
      <Style.Container></Style.Container>
    </Page>
  );
};

export { PillPage };
