import * as React from "react";

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

interface AddContentProps {
  index: number;

  addWrapper: () => void;
}

interface AddContentButtonProps {
  icon: React.ReactNode;
  title: string;
  description: string;

  onClick: () => void;
}

// 이후에는 컨텐츠 타입 확장을 고려할 필요가 있다.
const AddContent = React.forwardRef<HTMLDivElement, AddContentProps>(
  (props, ref) => {
    const creator = usePillCreator();

    const addData: AddFunction = (data) => {
      creator.add(AddType.INDEX_CONTENT, {
        index: props.index,
        content: data.content,
        subContent: data.subContent,
        contentType: data.type,
      });

      props.addWrapper();
    };

    return (
      <ContentContainerStyle layout={AddContentLayout} ref={ref} {...props}>
        <ContentContainerTitleStyle layout={AddContentTitleLayout}>
          <div>
            <AddIcon />
            <span>Add Content</span>
          </div>
        </ContentContainerTitleStyle>

        <AddImageButton onAdd={addData} />
        <AddTextButton onAdd={addData} />
      </ContentContainerStyle>
    );
  }
);

const AddContentButton = React.forwardRef<
  HTMLButtonElement,
  AddContentButtonProps
>((props, ref) => {
  return (
      <AddContentButtonStyle color="neutral" variant="soft" ref={ref} {...props}>
        {props.icon}
        <span>{props.title}</span>
        <span>{props.description}</span>
      </AddContentButtonStyle>
  );
});

export { AddContent, AddContentButton };
