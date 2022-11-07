import HistoryIcon from "@mui/icons-material/History";
import { HistoryStyle } from "./rc.style";

interface HistoryProps {
  unit: string;
  comments: number;
}

const History = (props: HistoryProps) => {
  return (
    <HistoryStyle>
      <HistoryIcon />
      <span>
        Recent {props.unit} (+{props.comments})
      </span>
    </HistoryStyle>
  );
};

export { History };
