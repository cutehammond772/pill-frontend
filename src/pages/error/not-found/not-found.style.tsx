/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Background = css`
  background: var(--bg-v-br-f-a);
`;

const Container = styled.div`
  height: 1536px;
`;

const Title = styled.h1`
  color: var(--dark);
  padding-top: 256px;
  font-size: 5rem;

  word-break: keep-all;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row;
  column-gap: 10px;
`;

export { Container, Title, Background, ButtonContainer };
