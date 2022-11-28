/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  min-height: 2048px;

  display: flex;
  flex-flow: column;
`;

export const Behaviors = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;

  & > .button {
    width: auto;
    height: auto;
    border-radius: 20px;

    cursor: pointer;

    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 2fr 3fr;
    text-transform: none;

    box-shadow: 0px 0px 10px var(--shadow);

    padding: 25px;
    column-gap: 20px;
    row-gap: 20px;

    background-color: var(--primary);

    & > .icon {
      grid-row: 1 / 3;

      font-size: 80px;
      align-self: center;
      color: var(--light);
    }

    & > .title {
      align-self: flex-start;
      text-align: start;

      font-weight: 700;
      font-size: 30px;
      color: var(--light);
    }

    & > .content {
      text-align: start;
      align-self: flex-start;

      font-weight: 700;
      font-size: 25px;
      color: var(--light);
    }
  }

  // mobile, tablet
  @media screen and (max-width: 992px) {
    display: flex;
    flex-flow: column nowrap;
    row-gap: 20px;
  }
`;

export const RecentPills = styled.div`
  width: auto;
  height: auto;

  display: flex;
  flex-flow: row nowrap;
  overflow-x: hidden;

  & > div {
    flex-shrink: 0;
    margin: 30px 30px 30px 0;
    width: 300px;
    height: 400px;
    box-shadow: 0px 10px 15px var(--shadow);
  }
`;

export const Subject = styled.div`
  font-size: 50px;
  font-weight: 700;

  padding-top: 150px;
  padding-bottom: 50px;

  word-break: keep-all;
  color: var(--dark);

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
`;

export const Background = css`
  background: var(--bg-h-br-t-a);
`;
