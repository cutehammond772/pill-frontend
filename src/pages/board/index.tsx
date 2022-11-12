import * as React from "react";
import {
  DefaultHeaderSignature,
  DefaultMenu,
} from "../../components/header/default";

import { Page } from "../../layouts/page";
import { usePageCheck } from "../../utils/hooks/header/page_check";

import * as Style from "./board.style";

const BoardPage = () => {
  // DefaultHeader에서 Board 아이템을 선택한다.
  usePageCheck(DefaultHeaderSignature, DefaultMenu.BOARD);

  return (
    <Page>
      <Style.Container></Style.Container>
    </Page>
  );
};

export { BoardPage };
