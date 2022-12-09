import { useAuth } from "../../utils/hooks/auth";

import UserHome from "./user";
import GuestHome from "./guest";

import * as React from "react";

import * as GuestStyle from "./guest/guest.style";
import * as UserStyle from "./user/user.style";
import Page from "../../layouts/page";
import { usePageSelect } from "../../utils/hooks/header/page-select";
import { DefaultHeaderSignature, DefaultMenus } from "../../components/header/default";

const HomePage = () => {
  const auth = useAuth();

  // DefaultHeader에서 Home 아이템을 선택한다.
  usePageSelect(DefaultHeaderSignature, DefaultMenus.HOME);

  return (
    <Page
      layout={auth.authorized ? UserStyle.Background : GuestStyle.Background}
    >
      {auth.authorized ? <UserHome /> : <UserHome />}
    </Page>
  );
};

export default HomePage;
