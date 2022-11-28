/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  min-height: 1536px;

  padding-top: 128px;
  padding-bottom: 1024px;

  display: flex;
  flex-flow: column;

  row-gap: 512px;
`;

export const Background = css`
  background: var(--light);
`;
