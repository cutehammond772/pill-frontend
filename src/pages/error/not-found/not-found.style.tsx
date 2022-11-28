/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Background = css`
  background: var(--bg-v-br-f-a);
`;

export const Container = styled.div`
  height: 1536px;
`;

export const Title = styled.h1`
  color: var(--dark);
  padding-top: 256px;
  font-size: 5rem;

  word-break: keep-all;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row;
  column-gap: 10px;
`;
