import { useAuth } from "../../utils/hooks/auth";

import { UserHome } from "./user";
import { GuestHome } from "./guest";

import * as React from "react";

import * as GuestStyle from "./guest/guest.style";
import * as UserStyle from "./user/user.style";
import { Page } from "../../layouts/page";
import { usePageCheck } from "../../utils/reducers/header/page_check";
import { DefaultHeaderSignature, DefaultMenu } from "../../components/header/default";

const HomePage = () => {
  const auth = useAuth();

  // DefaultHeader에서 Home 아이템을 선택한다.
  usePageCheck(DefaultHeaderSignature, DefaultMenu.HOME);

  return (
    <Page
      layout={auth.authenticated ? UserStyle.Background : GuestStyle.Background}
    >
      {auth.authenticated ? <UserHome /> : <GuestHome />}
    </Page>
  );
};

export { HomePage };
