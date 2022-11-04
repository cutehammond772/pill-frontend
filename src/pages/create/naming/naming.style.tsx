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

  background: #303030;

  // Title Text
  & > span {
    font-family: Inter;
    font-weight: 500;
    color: white;
    font-size: 1.5rem;
    line-height: 100%;

    text-transform: uppercase;
    user-select: none;
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

  background: #303030;

  // Categories Text
  & > span {
    font-family: Inter;
    font-weight: 500;
    color: white;
    font-size: 1.5rem;
    line-height: 100%;

    text-transform: uppercase;
    user-select: none;
  }
`;

export { Layout, CategoriesStyle, TitleStyle };
