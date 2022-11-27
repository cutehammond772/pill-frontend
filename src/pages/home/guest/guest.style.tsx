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
  padding-top: 256px;
  color: var(--dark);

  font-size: 40px;
  word-break: keep-all;

  @media screen and (max-width: 768px){
    font-size: 30px;
  }
`;

const Background = css`
  background: var(--bg-h-br-t-a);
`;

export { Container, Text, Background };
