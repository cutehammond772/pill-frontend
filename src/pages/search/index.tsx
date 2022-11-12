import * as React from "react";

import { Page } from "../../layouts/page";
import { usePageCheck } from "../../utils/hooks/header/page_check";
import {
  DefaultHeaderSignature,
  DefaultMenu,
} from "../../components/header/default";

import * as Style from "./search.style";

const SearchPage = () => {
  // DefaultHeader에서 Search 아이템을 선택한다.
  usePageCheck(DefaultHeaderSignature, DefaultMenu.SEARCH);

  return (
    <Page>
      <Style.Container></Style.Container>
    </Page>
  );
};

export { SearchPage };
