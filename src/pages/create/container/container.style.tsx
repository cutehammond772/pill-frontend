import styled from "@emotion/styled";

import { SerializedStyles } from "@emotion/serialize";

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
  row-gap: 15px;

  margin-bottom: 30px;

  // Title
  & > span:nth-of-type(1) {
    color: var(--dark);
    font-weight: 700;
    font-size: 40px;

    line-height: 100%;
  }

  // Complete Chip
  & > div:nth-of-type(1) {
  }
`;

export { Container, Title };
