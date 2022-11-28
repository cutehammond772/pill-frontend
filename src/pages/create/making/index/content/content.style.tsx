import styled from "@emotion/styled";
import { SerializedStyles } from "@emotion/react";

const Container = styled.div<{ layout: SerializedStyles }>`
  width: auto;
  height: auto;
  padding: 10px;
  border-radius: 12px;

  background: white;
  column-gap: 10px;
  row-gap: 10px;

  ${(props) => props.layout};
`;

const Title = styled.div<{ layout?: SerializedStyles }>`
  display: flex;
  flex-flow: row;
  column-gap: 10px;
  align-items: center;
  justify-content: space-between;

  // Title
  & > .container {
    display: flex;
    flex-flow: row;
    column-gap: 10px;
    align-items: center;
  }

  & > .container > .icon {
    font-size: 30px;
  }

  & > .container > .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 100%;
  }

  // Buttons
  & > .buttons {
    display: flex;
    flex-flow: row;
    align-items: center;
    column-gap: 10px;
  }

  ${(props) => props.layout};
`;

export { Container, Title };