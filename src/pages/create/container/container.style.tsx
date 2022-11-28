import styled from "@emotion/styled";

import { SerializedStyles } from "@emotion/react";

const Container = styled.div<{ layout: SerializedStyles }>`
  width: auto;
  height: auto;
  position: relative;

  ${(props) => props.layout};
`;

const Title = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  row-gap: 20px;

  margin-bottom: 30px;

  // Title
  & > .title {
    font-weight: 700;
    font-size: 40px;
    
    line-height: 150%;
    color: var(--dark);
  }
`;

export { Container, Title };
