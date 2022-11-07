import { AddIndexStyle } from "./add_index.style";
import AddIcon from "@mui/icons-material/Add";

interface AddIndexProps {
  onClick: () => void;
}

const AddIndex = (props: AddIndexProps) => {
  return (
    <AddIndexStyle color="primary" variant="text" onClick={props.onClick}>
      <AddIcon />
      <span>Add Index</span>
    </AddIndexStyle>
  );
};

export { AddIndex };
