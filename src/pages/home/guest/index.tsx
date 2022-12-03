import * as React from "react";

import * as Style from "./guest.style";
import { useI18n } from "../../../utils/hooks/i18n";
import { I18N } from "../../../utils/i18n";

const GuestHome = () => {
  const { text } = useI18n();

  return (
    <Style.Container>
      <div className="content">{text(I18N.PAGE_GUEST_01)}</div>
    </Style.Container>
  );
};

export default React.memo(GuestHome);
