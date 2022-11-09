import HistoryIcon from "@mui/icons-material/History";
import * as Style from "./rc.style";

interface HistoryProps {
  unit: string;
  comments: number;
}

const History = (props: HistoryProps) => {
  return (
    <Style.History>
      <HistoryIcon />
      <span>
        Recent {props.unit} (+{props.comments})
      </span>
    </Style.History>
  );
};

export { History };
