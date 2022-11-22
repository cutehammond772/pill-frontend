/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Container = styled.div`
  height: 1536px;

  display: flex;
  flex-flow: column;
  row-gap: 50px;
  align-items: flex-start;
`;

const Text = styled.h1`
  color: var(--dark);
  padding-top: 256px;
  font-size: 2.5rem;
`;

const Background = css`
  background: var(--bg-h-br-t-a);
`;

export { Container, Text, Background };
