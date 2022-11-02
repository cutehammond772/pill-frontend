import HistoryIcon from "@mui/icons-material/History";
import { HistoryStyle } from "./rc.style";

const History = ({
  unit,
  comments,
}: {
  unit: string;
  comments: number;
}) => {
  return (
    <HistoryStyle>
      <HistoryIcon />
      <span>
        Recent {unit} (+{comments})
      </span>
    </HistoryStyle>
  );
};

export { History };
