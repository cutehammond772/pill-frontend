/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Layout = css`
  display: grid;
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 300px 1fr;

  border-radius: 15px;
  padding: 15px;
  box-shadow: 0px 0px 5px var(--shadow);

  // PillPreview
  & > div:first-of-type {
    grid-row: 1 / 3;
  }
`;

const Title = styled.div`
  margin-left: 30px;
  padding: 15px;
  border-radius: 15px;

  display: flex;
  flex-flow: column;
  justify-content: center;
  row-gap: 15px;

  // Title Text
  & > .title {
    font-weight: 700;
    color: var(--dark);
    font-size: 1.5rem;
    line-height: 100%;

    text-transform: uppercase;
  }
`;

const Categories = styled.div`
  margin-left: 30px;
  margin-top: 15px;
  padding: 15px;
  border-radius: 15px;

  display: flex;
  flex-flow: column;
  
  row-gap: 15px;

  & > .container {
    display: flex;
    flex-flow: row wrap;
    column-gap: 5px;
    row-gap: 5px;
  }

  // Categories Text
  & > .title {
    font-weight: 700;
    color: var(--dark);
    font-size: 1.5rem;
    line-height: 100%;

    text-transform: uppercase;
  }
`;

export { Layout, Categories, Title };
