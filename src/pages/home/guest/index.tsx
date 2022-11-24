import { Login } from "../../../components/auth";
import * as React from "react";

import * as config from "../../../config";
import * as Style from "./guest.style";
import { useLocalization } from "../../../utils/hooks/localization";
import { L10N } from "../../../localization";

const GuestHome = React.memo(() => {
  const { text } = useLocalization();

  return (
    <Style.Container>
      <Style.Text>
        {text(L10N.PAGE_GUEST_01)}
      </Style.Text>

      <Login redirect={config.INDEX} provider="google">
      {text(L10N.PAGE_GUEST_02)}
      </Login>
    </Style.Container>
  );
});

export { GuestHome };
