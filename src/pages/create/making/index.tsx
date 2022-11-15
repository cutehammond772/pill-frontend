import { Container } from "../container";
import * as Style from "./making.style";
import { IndexContainer } from "./index/index";
import { AddIndex } from "./add_index";

import * as React from "react";

import { usePillCreator } from "../../../utils/hooks/pill_creator";
import { Collapse } from "@mui/material";

const Content = () => {
  const creator = usePillCreator();

  return (
    <Container title="당신의 Pill을 채워봅시다." complete={false} layout={Style.Layout}>
      <Style.TransitionGroup>
        {creator.data.indexes.map((index, order) => (
          <Collapse key={index.id}>
            <IndexContainer id={index.id} order={order} />
          </Collapse>
        ))}
      </Style.TransitionGroup>

      <AddIndex onClick={() => creator.addIndex()} />
    </Container>
  );
};

export { Content };
