/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Background = css`
  background: linear-gradient(
    45deg,
    hsla(339, 100%, 55%, 0.05) 0%,
    hsla(197, 100%, 64%, 0.05) 100%
  );
`;

const Container = styled.div`
  height: 1536px;
`;

const Title = styled.h1`
  color: var(--dark);
  padding-top: 256px;
  font-size: 5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row;
  column-gap: 10px;
`;

export { Container, Title, Background, ButtonContainer };
