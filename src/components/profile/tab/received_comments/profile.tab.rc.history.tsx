import HistoryIcon from "@mui/icons-material/History";
import { ReceivedCommentsHistoryContent } from "./profile.tab.rc.style";

const ReceivedCommentsHistory = ({
  unit,
  comments,
}: {
  unit: string;
  comments: number;
}) => {
  return (
    <ReceivedCommentsHistoryContent>
      <HistoryIcon />
      <span>
        Recent {unit} (+{comments})
      </span>
    </ReceivedCommentsHistoryContent>
  );
};

export { ReceivedCommentsHistory };
