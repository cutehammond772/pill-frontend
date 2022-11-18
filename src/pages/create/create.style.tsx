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
  background: linear-gradient(
    45deg,
    hsla(339, 100%, 55%, 0.05) 0%,
    hsla(197, 100%, 64%, 0.05) 100%
  );
`;

export { Container, Background };
