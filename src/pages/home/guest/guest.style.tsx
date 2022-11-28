/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  min-height: 1536px;

  display: flex;
  flex-flow: column;
  row-gap: 50px;
  align-items: flex-start;

  // mobile
  @media screen and (max-width: 768px) {
    min-height: 1024px;
    row-gap: 100px;
    align-items: stretch;
  }
`;

export const Text = styled.h1`
  margin-top: 256px;
  color: var(--dark);

  font-size: 2.5rem;
  word-break: keep-all;

  // mobile
  @media screen and (max-width: 768px) {
    margin-top: 192px;
    font-size: 2rem;
  }
`;

export const Background = css`
  background: var(--bg-h-br-t-a);
`;
