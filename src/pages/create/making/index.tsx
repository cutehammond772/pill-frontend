import { Container } from "../container";
import * as Style from "./making.style";
import { IndexContainer } from "./index/index";
import { AddIndex } from "./add_index";

import * as React from "react";

import { Collapse } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/reducers";
import { usePillDefaultEditor } from "../../../utils/hooks/pill_creator";

const Content = () => {
  const editor = usePillDefaultEditor();
  const indexes = useSelector((state: RootState) => state.pill.indexes);

  return (
    <Container
      title="당신의 Pill을 채워봅시다."
      complete={false}
      layout={Style.Layout}
    >
      <Style.TransitionGroup>
        {indexes.map((index, order) => (
          <Collapse key={index.id}>
            <IndexContainer id={index.id} order={order} />
          </Collapse>
        ))}
      </Style.TransitionGroup>

      <AddIndex onClick={editor.addIndex} />
    </Container>
  );
};

export { Content };
