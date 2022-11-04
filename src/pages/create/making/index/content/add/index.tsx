import {
  ContentContainerStyle,
  ContentContainerTitleStyle,
} from "../content.style";
import {
  AddContentButtonStyle,
  AddContentLayout,
  AddContentTitleLayout,
} from "./add.style";

import ImageIcon from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";
import ArticleIcon from "@mui/icons-material/Article";

const AddContent = () => (
  <ContentContainerStyle layout={AddContentLayout}>
    <ContentContainerTitleStyle layout={AddContentTitleLayout}>
      <div>
        <AddIcon />
        <span>Add Content</span>
      </div>
    </ContentContainerTitleStyle>
    <AddContentButton
      icon={<ImageIcon />}
      title="Image"
      subscription="add an image into the pill."
      onClick={() => {}}
    />
    <AddContentButton
      icon={<ArticleIcon />}
      title="Text"
      subscription="add an text into the pill."
      onClick={() => {}}
    />
  </ContentContainerStyle>
);

const AddContentButton = ({
  icon,
  title,
  subscription,

  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subscription: string;
  onClick: () => void;
}) => (
  <AddContentButtonStyle color="neutral" variant="soft" onClick={onClick}>
    {icon}
    <span>{title}</span>
    <span>{subscription}</span>
  </AddContentButtonStyle>
);

export { AddContent };
