import * as Style from "./add-index.style";
import AddIcon from "@mui/icons-material/Add";
import { useI18n } from "../../../../utils/hooks/i18n";
import { I18N } from "../../../../i18n";

interface AddIndexProps {
  onClick: () => void;
}

const AddIndex = (props: AddIndexProps) => {
  const { text } = useI18n();

  return (
    <Style.AddIndexButton
      color="primary"
      variant="text"
      onClick={props.onClick}
    >
      <AddIcon className="icon" />
      <span className="title">{text(I18N.PAGE_CREATE_08)}</span>
    </Style.AddIndexButton>
  );
};

export default AddIndex;
