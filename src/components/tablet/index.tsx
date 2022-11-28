import * as React from "react";
import { L10N } from "../../localization";
import { useLocalization } from "../../utils/hooks/l10n";
import * as Style from "./tablet.style";

export interface PillTabletProps {
  title?: string;
  author?: string;

  likes?: number;
  views?: number;
};

const PillTablet = (props: PillTabletProps) => {
  const { text } = useLocalization();

  return (
    <Style.Border>
      <Style.Container>
        <div className="title">{props.title || text(L10N.TABLET_01)}</div>
        <div className="info">
          <div className="author">{props.author || text(L10N.TABLET_02)}</div>
          <div className="menu">
            <Style.Heart />
            {props.likes || 0}
            <Style.View />
            {props.views || 0}
          </div>
        </div>
      </Style.Container>
    </Style.Border>
  );
};

export default React.memo(PillTablet);
