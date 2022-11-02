import { Container } from "../container";
import { Layout } from "./making.style";
import { AddIndex, IndexContainer } from "./making.index";

import * as React from "react";

const Content = () => {
  return (
    <Container title="2. Making Pill" complete={false} layout={Layout}>
      <IndexContainer />
      <AddIndex />
    </Container>
  );
};

export { Content };
