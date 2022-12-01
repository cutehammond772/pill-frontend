import { Login } from "../../../components/auth";
import * as React from "react";

import * as config from "../../../config";
import * as Style from "./guest.style";
import { useI18n } from "../../../utils/hooks/i18n";
import { I18N } from "../../../utils/i18n";

const GuestHome = () => {
  const { text } = useI18n();

  return (
    <Style.Container>
      <Style.Text>{text(I18N.PAGE_GUEST_01)}</Style.Text>

      <Login redirect={config.INDEX} provider="google">
        {text(I18N.PAGE_GUEST_02)}
      </Login>
    </Style.Container>
  );
};

export default React.memo(GuestHome);
