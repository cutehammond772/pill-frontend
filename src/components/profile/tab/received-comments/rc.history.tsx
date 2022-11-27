import HistoryIcon from "@mui/icons-material/History";
import { L10N } from "../../../../localization";
import { useLocalization } from "../../../../utils/hooks/l10n";
import { format } from "../../../../utils/other/format";
import * as Style from "./rc.style";

interface HistoryProps {
  unit: string;
  comments: number;
}

const History = (props: HistoryProps) => {
  const { text } = useLocalization();
  return (
    <Style.History>
      <HistoryIcon />
      <span className="info">
        {format(text(L10N.TAB_05), props.unit, `${props.comments}`)}
      </span>
    </Style.History>
  );
};

export { History };
