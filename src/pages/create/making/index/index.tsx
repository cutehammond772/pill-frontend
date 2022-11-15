import * as React from "react";
import * as Style from "./index.style";

import { Title } from "./title";
import { AddContent } from "./content/add";
import { usePillCreator } from "../../../../utils/hooks/pill_creator";

import { Collapse } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { PillContentTypeMapper } from "../../../../utils/reducers/pill/pill.type";
import { useRollback } from "../../../../utils/hooks/rollback";

interface IndexContainerProps {
  id: string;
  order: number;
}

const IndexContainer = (props: IndexContainerProps) => {
  const creator = usePillCreator();
  const rollback = useRollback();

  // 롤백 데이터(=백업 데이터)는 삭제 과정에서 자동으로 캡처된다.
  // TransitionGroup 특성 상, exiting 과정에서 삭제된 index를 가진 컴포넌트를 다시 렌더링한다.
  // 이때 TransitionGroup은 특정한 복사 방식을 통해 복사된 이전 컴포넌트를 렌더링하는 것처럼 보이는데,
  // 이처럼 컴포넌트 내에서 능동적으로 리덕스 컨테이너를 참조하는 부분까지는 복사하지 못했다.
  // 그렇기에 여기서의 롤백 데이터는 복원 목적이 아닌 삭제된 데이터를 다시 참조하기 위해 사용된다.
  const index = rollback.getIndex(props) || creator.getIndex(props);

  return (
    <Style.IndexContainer>
      <Title {...props} />

      <TransitionGroup>
        {index.contents.map((content) => {
          const Element = PillContentTypeMapper[content.type];
          
          return (
            <Collapse key={content.contentId}>
              <Element {...{ id: props.id, contentId: content.contentId }} />
            </Collapse>
          );
        })}
      </TransitionGroup>

      <AddContent id={props.id} />
    </Style.IndexContainer>
  );
};

export { IndexContainer };
