import * as React from "react";

import { I18N } from "../../../../utils/i18n";
import { useI18n } from "../../../../utils/hooks/i18n";
import { format } from "../../../../utils/other/format";

import * as Style from "./rc.style";
import HistoryIcon from "@mui/icons-material/History";

interface HistoryProps {
  unit: string;
  comments: number;
}

const History = (props: HistoryProps) => {
  const { text } = useI18n();
  return (
    <Style.History>
      <HistoryIcon />
      <span className="info">
        {format(text(I18N.TAB_05), props.unit, `${props.comments}`)}
      </span>
    </Style.History>
  );
};

export default React.memo(History);
