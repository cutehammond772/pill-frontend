import * as React from "react";
import {
  DefaultHeaderSignature,
  DefaultMenu,
} from "../../components/header/default";

import { Page } from "../../layouts/page";
import { usePageCheck } from "../../utils/reducers/header/page_check";

const BoardPage = () => {
  // DefaultHeader에서 Board 아이템을 선택한다.
  usePageCheck(DefaultHeaderSignature, DefaultMenu.BOARD);
  
  return <Page></Page>;
};

export { BoardPage };
