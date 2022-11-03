import { Container } from "../container";
import { Layout } from "./making.style";
import { AddIndex, IndexContainer } from "./making.index";

import * as React from "react";
import { usePillCreator } from "../../../utils/hooks/pill_creator";
import { AddType } from "../../../utils/hooks/pill_creator/pill_creator.type";

const Content = () => {
  const creator = usePillCreator();

  return (
    <Container title="2. Making Pill" complete={false} layout={Layout}>
      {creator.data.indexes.map((index) => (
        <IndexContainer key={index.key} />
      ))}

      <AddIndex
        onClick={() => {
          creator.add(AddType.INDEX);
        }}
      />
    </Container>
  );
};

export { Content };
