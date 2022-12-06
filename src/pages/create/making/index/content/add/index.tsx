import * as React from "react";

import * as ContentStyle from "../content.style";
import * as Style from "./add.style";

import AddIcon from "@mui/icons-material/Add";

import { AddImageButton } from "../image";
import { AddTextButton } from "../text";
import { useI18n } from "../../../../../../utils/hooks/i18n";
import { I18N } from "../../../../../../utils/i18n";

interface AddContentButtonProps {
  icon: React.ComponentType<{ className: string }>;
  title: string;
  description: string;

  onClick: () => void;
}

interface AddContentContainerProps {
  id: string;
}

export const AddContentContainer = React.memo(
  (props: AddContentContainerProps) => {
    const { text } = useI18n();

    return (
      <ContentStyle.Container layout={Style.ContainerLayout}>
        <ContentStyle.Title>
          <div className="container">
            <AddIcon className="icon" />
            <span className="title">{text(I18N.PAGE_CREATE_10)}</span>
          </div>
        </ContentStyle.Title>

        <div className="buttons">
          <AddImageButton id={props.id} />
          <AddTextButton id={props.id} />
        </div>
      </ContentStyle.Container>
    );
  }
);

export const AddContentButton = React.memo((props: AddContentButtonProps) => (
  <Style.AddContentButton onClick={props.onClick}>
    <div className="title">
      <props.icon className="icon" />
      <div className="content">{props.title}</div>
    </div>

    <div className="description">{props.description}</div>
  </Style.AddContentButton>
));
