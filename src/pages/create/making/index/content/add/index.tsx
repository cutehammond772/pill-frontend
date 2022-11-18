import * as React from "react";

import * as ContentStyle from "../content.style";
import * as Style from "./add.style";

import AddIcon from "@mui/icons-material/Add";

import { AddImageButton } from "../image";
import { AddTextButton } from "../text";

interface AddContentButtonProps {
  icon: React.ComponentType<{ className: string }>;
  title: string;
  description: string;

  onClick: () => void;
}

interface AddContentContainerProps {
  id: string;
}

const AddContentContainer = React.memo((props: AddContentContainerProps) => {
  return (
    <ContentStyle.Container layout={Style.ContainerLayout}>
      <ContentStyle.Title layout={Style.TitleLayout}>
        <div className="container">
          <AddIcon className="icon" />
          <span className="title">컨텐츠 추가하기</span>
        </div>
      </ContentStyle.Title>

      <AddImageButton id={props.id} />
      <AddTextButton id={props.id} />
    </ContentStyle.Container>
  );
});

const AddContentButton = React.memo((props: AddContentButtonProps) => (
  <Style.AddContentButton
    color="neutral"
    variant="soft"
    onClick={props.onClick}
  >
    <props.icon className="icon" />
    <span className="title">{props.title}</span>
    <span className="description">{props.description}</span>
  </Style.AddContentButton>
));

export { AddContentContainer, AddContentButton };
