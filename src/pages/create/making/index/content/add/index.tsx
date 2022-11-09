import * as React from "react";

import * as ContentStyle from "../content.style";
import * as Style from "./add.style";

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
      <ContentStyle.Container
        layout={Style.ContainerLayout}
        ref={ref}
        {...props}
      >
        <ContentStyle.Title layout={Style.TitleLayout}>
          <div>
            <AddIcon />
            <span>Add Content</span>
          </div>
        </ContentStyle.Title>

        <AddImageButton onAdd={addData} />
        <AddTextButton onAdd={addData} />
      </ContentStyle.Container>
    );
  }
);

const AddContentButton = React.forwardRef<
  HTMLButtonElement,
  AddContentButtonProps
>((props, ref) => {
  return (
    <Style.AddContentButton color="neutral" variant="soft" ref={ref} {...props}>
      {props.icon}
      <span>{props.title}</span>
      <span>{props.description}</span>
    </Style.AddContentButton>
  );
});

export { AddContent, AddContentButton };
