import * as Style from "./add_index.style";
import AddIcon from "@mui/icons-material/Add";

interface AddIndexProps {
  onClick: () => void;
}

const AddIndex = (props: AddIndexProps) => {
  return (
    <Style.AddIndexButton color="primary" variant="text" onClick={props.onClick}>
      <AddIcon className="icon"/>
      <span className="title">Add Index</span>
    </Style.AddIndexButton>
  );
};

export { AddIndex };
