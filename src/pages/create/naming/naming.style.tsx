/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Layout = css`
  display: grid;
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 300px 1fr;
`;

const TitleStyle = styled.div`
  margin-left: 30px;
  padding: 15px;
  border-radius: 15px;

  display: flex;
  flex-flow: column;
  justify-content: space-between;
  row-gap: 15px;

  background: grey;

  // Title Text
  & > span {
    font-family: Inter;
    font-weight: 700;
    color: #202020;
    font-size: 2rem;
    line-height: 100%;
  }
`;

const CategoriesStyle = styled.div`
  margin-left: 30px;
  margin-top: 15px;
  padding: 15px;
  border-radius: 15px;

  display: flex;
  flex-flow: column;
  justify-content: space-between;
  row-gap: 15px;

  background: grey;

  // Categories Text
  & > span {
    font-family: Inter;
    font-weight: 700;
    color: #202020;
    font-size: 2rem;
    line-height: 100%;
  }
`;

export { Layout, CategoriesStyle, TitleStyle };
