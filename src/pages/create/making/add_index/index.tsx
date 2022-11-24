import * as Style from "./add_index.style";
import AddIcon from "@mui/icons-material/Add";
import { useLocalization } from "../../../../utils/hooks/localization";
import { L10N } from "../../../../localization";

interface AddIndexProps {
  onClick: () => void;
}

const AddIndex = (props: AddIndexProps) => {
  const { text } = useLocalization();

  return (
    <Style.AddIndexButton
      color="primary"
      variant="text"
      onClick={props.onClick}
    >
      <AddIcon className="icon" />
      <span className="title">{text(L10N.PAGE_CREATE_08)}</span>
    </Style.AddIndexButton>
  );
};

export { AddIndex };
