/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Container = styled.div`
  min-height: 1536px;

  padding-top: 256px;
  padding-bottom: 1024px;

  display: flex;
  flex-flow: column;
  row-gap: 512px;
`;

const Background = css`
  background: var(--light);
`;

export { Container, Background };
