import {
  ContentContainerStyle,
  ContentContainerTitleStyle,
} from "../content.style";
import {
  AddContentButtonStyle,
  AddContentLayout,
  AddContentTitleLayout,
} from "./add.style";

import AddIcon from "@mui/icons-material/Add";
import { AddFunction } from "../../../../../../utils/reducers/pill/pill.type";

import { usePillCreator } from "../../../../../../utils/hooks/pill_creator";
import { AddType } from "../../../../../../utils/hooks/pill_creator/pill_creator.type";
import { AddImageButton } from "../image";
import { AddTextButton } from "../text";

// 이후에는 컨텐츠 타입 확장을 고려할 필요가 있다.
const AddContent = ({
  index,
  addWrapper,
}: {
  index: number;
  addWrapper: () => void;
}) => {
  const creator = usePillCreator();

  const addData: AddFunction = (data) => {
    creator.add(AddType.INDEX_CONTENT, {
      index: index,
      content: data.content,
      subContent: data.subContent,
      contentType: data.type,
    });

    addWrapper();
  };

  return (
    <>
      <ContentContainerStyle layout={AddContentLayout}>
        <ContentContainerTitleStyle layout={AddContentTitleLayout}>
          <div>
            <AddIcon />
            <span>Add Content</span>
          </div>
        </ContentContainerTitleStyle>

        <AddImageButton onAdd={addData} />
        <AddTextButton onAdd={addData} />
      </ContentContainerStyle>
    </>
  );
};

const AddContentButton = ({
  icon,
  title,
  description,

  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) => (
  <AddContentButtonStyle color="neutral" variant="soft" onClick={onClick}>
    {icon}
    <span>{title}</span>
    <span>{description}</span>
  </AddContentButtonStyle>
);

export { AddContent, AddContentButton };
