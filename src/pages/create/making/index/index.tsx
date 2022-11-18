import * as React from "react";
import { useEffect, useState } from "react";

import * as Style from "./index.style";

import Title from "./title";
import { AddContentContainer } from "./content/add";

import { Collapse } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { useRollback } from "../../../../utils/hooks/rollback";
import { useValidation } from "../../../../utils/hooks/validation";

import * as Index from "../../../../utils/validators/create/index";
import * as Content from "../../../../utils/validators/create/content";

import { PillContentTypeMapper } from "../../../../utils/reducers/pill/pill.type";
import {
  usePillIndexEditor,
  usePillOrder,
} from "../../../../utils/hooks/pill_creator";
import { IndexContentProps } from "./content/content.type";

interface IndexContainerProps {
  id: string;
  order: number;
}

const IndexContainer = (props: IndexContainerProps) => {
  const editor = usePillIndexEditor({ id: props.id });
  const order = usePillOrder();
  const rollback = useRollback();

  const validator = useValidation(Index.Validator(props));

  // 롤백 데이터(=백업 데이터)는 삭제 과정에서 자동으로 캡처된다.
  // TransitionGroup 특성 상, exiting 과정에서 삭제된 index를 가진 컴포넌트를 다시 렌더링한다.
  // 이때 TransitionGroup은 특정한 복사 방식을 통해 복사된 이전 컴포넌트를 렌더링하는 것처럼 보이는데,
  // 이처럼 컴포넌트 내에서 능동적으로 리덕스 컨테이너를 참조하는 부분까지는 복사하지 못했다.
  // 그렇기에 여기서의 롤백 데이터는 복원 목적이 아닌 삭제된 데이터를 다시 참조하기 위해 사용된다.
  const index = rollback.getIndex(props) || editor.index;

  const [title, setTitle] = useState<string>(index.title);

  const handleIndexRemove = () => {
    rollback.captureIndex(index);
    editor.remove();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.length <= 40) {
      setTitle(value);
      editor.updateTitle({ title: value });
      validator.needValidate();
    }
  };

  const handleExchange = (from: number, to: number) => {
    if (from === to || to < 0 || to >= index.contents.length) {
      throw new Error();
    }

    editor.exchangeContent({
      contentId: index.contents[from].contentId,
      exchangeId: index.contents[to].contentId,
    });

    validator.forceRefresh({
      id: index.contents[to].contentId,
      signature: Content.SIGNATURE,
    });
  };

  useEffect(() => {
    validator.validate({
      title: index.title,
      contentsSize: index.contents.length,
    });
  }, [index, validator]);

  useEffect(() => {
    validator.updateDependencyIds({
      signature: Content.SIGNATURE,
      ids: index.contents.map((content) => content.contentId),
    });
  }, [validator, index.contents]);

  return (
    <Style.IndexContainer>
      <Title
        order={props.order}
        title={title}
        onRemove={handleIndexRemove}
        onTextChange={handleTitleChange}
        removed={!!rollback.getIndex(props)}
      />

      <TransitionGroup>
        {index.contents.map((content) => {
          const Content = PillContentTypeMapper[content.type];
          const contentOrder = order.getContentOrder({
            id: props.id,
            contentId: content.contentId,
          });
          const contentProps: IndexContentProps = {
            removed:
              !!rollback.getIndex({ id: props.id }) ||
              !!rollback.getContent({ contentId: content.contentId }),
            order: contentOrder,
            isEnd: contentOrder === index.contents.length - 1,
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
