import { AddIndexStyle } from "./add_index.style";
import AddIcon from "@mui/icons-material/Add";

const AddIndex = ({ onClick }: { onClick: () => void }) => {
  return (
    <AddIndexStyle color="info" variant="contained" onClick={onClick}>
      <AddIcon />
      <span>Add Index</span>
    </AddIndexStyle>
  );
};

export { AddIndex };
