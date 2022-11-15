import * as Style from "./add_index.style";
import AddIcon from "@mui/icons-material/Add";

interface AddIndexProps {
  onClick: () => void;
}

const AddIndex = (props: AddIndexProps) => {
  return (
    <Style.AddIndexButton color="primary" variant="text" onClick={props.onClick}>
      <AddIcon className="icon"/>
      <span className="title">인덱스 추가</span>
    </Style.AddIndexButton>
  );
};

export { AddIndex };
