import * as React from "react";
import { useEffect, useState } from "react";

import * as Style from "./index.style";

import Title from "./title";
import { AddContentContainer } from "./content/add";

import { Collapse } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { useValidation } from "../../../../utils/hooks/validation";

import * as Index from "../../../../utils/validators/create/index/";
import * as Content from "../../../../utils/validators/create/content";

import { PillContentTypeMapper } from "../../../../utils/reducers/pill/pill.type";
import {
  usePillIndexEditor,
  usePillOrder,
} from "../../../../utils/hooks/pill_creator";
import { IndexContentProps } from "./content/content.type";
import { validatorID } from "../../../../utils/validators/validator.type";

interface IndexContainerProps {
  id: string;
  order: number;
}

// 롤백 데이터(=백업 데이터)는 삭제 과정에서 자동으로 캡처된다.
// TransitionGroup 특성 상, exiting 과정에서 삭제된 index를 가진 컴포넌트를 다시 렌더링한다.
// 이때 TransitionGroup은 특정한 복사 방식을 통해 복사된 이전 컴포넌트를 렌더링하는 것처럼 보이는데,
// 이처럼 컴포넌트 내에서 능동적으로 리덕스 컨테이너를 참조하는 부분까지는 복사하지 못했다.
// 그렇기에 여기서의 롤백 데이터는 복원 목적이 아닌 삭제된 데이터를 다시 참조하기 위해 사용된다.
const IndexContainer = (props: IndexContainerProps) => {
  const editor = usePillIndexEditor(props.id);
  const order = usePillOrder();

  const validator = useValidation(Index.Validator(props.id));
  const [title, setTitle] = useState<string>(editor.index.title);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.length <= 40) {
      setTitle(value);
      editor.updateTitle(value);
      validator.needValidate();
    }
  };

  const handleExchange = (from: number, to: number) => {
    if (from === to || to < 0 || to >= editor.index.contents.length) {
      throw new Error();
    }

    editor.exchangeContent(
      editor.index.contents[from].contentId,
      editor.index.contents[to].contentId
    );

    validator.needValidate();
    validator.refreshValidator(
      validatorID(Content.SIGNATURE, editor.index.contents[to].contentId)
    );
  };

  useEffect(() => {
    validator.validate({
      title: editor.index.title,
      contentsSize: editor.index.contents.length,
    });
  }, [editor.index, validator]);

  const handleRemove = () => {
    editor.remove();
    validator.remove();
  };

  return (
    <Style.IndexContainer>
      <Title
        order={props.order}
        title={title}
        onRemove={handleRemove}
        onTextChange={handleTitleChange}
        removed={editor.removed}
      />

      <TransitionGroup>
        {editor.index.contents.map((content) => {
          const Content = PillContentTypeMapper[content.type];
          const contentOrder = editor.removed
            ? 0
            : order.getContentOrder(props.id, content.contentId);

          const contentProps: IndexContentProps = {
            removed: editor.removed,
            order: contentOrder,
            isEnd: contentOrder === editor.index.contents.length - 1,
            id: props.id,
            contentId: content.contentId,
            onExchange: (relation: number) =>
              handleExchange(contentOrder, contentOrder + relation),
          };

          return (
            <Collapse key={content.contentId}>
              <Content {...contentProps} />
            </Collapse>
          );
        })}
      </TransitionGroup>

      <AddContentContainer id={props.id} />
    </Style.IndexContainer>
  );
};

export { IndexContainer };
