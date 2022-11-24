/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Layout = css`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 100px;
  margin-top: 100px;
`;

const Tablets = styled.div`
  display: flex;
  flex-flow: column nowrap;

  position: relative;
  overflow: hidden;

  & > .backdrop {
    position: absolute;
    width: 100%;
    height: 100%;

    z-index: 1;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(0, 0, 0, 0) 25%,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0) 75%,
      rgba(255, 255, 255, 1) 100%
    );
  }

  & > .row {
    width: 2048px;
    position: relative;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    left: -100px;

    & > :not(.backdrop-container) {
      z-index: 2;
    }

    & > .backdrop-container {
      position: relative;
      display: flex;

      & > .backdrop {
        position: absolute;
        width: 100%;
        height: 100%;

        backdrop-filter: blur(4px);
      }

      & > div:last-of-type {
        margin: 10px;
      }
    }
  }
`;

const Form = styled.div`
  min-height: 150px;
  
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0px 0px 5px var(--shadow);
  
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-flow: column wrap;
  row-gap: 20px;

  background-color: var(--panel);
`;

const Title = styled.div`
  padding: 15px;
  border-radius: 15px;

  display: flex;
  flex-flow: column;
  row-gap: 20px;

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
  padding: 15px;
  border-radius: 15px;

  display: flex;
  flex-flow: column;
  row-gap: 20px;

  & > .container {
    display: flex;
    flex-flow: row wrap;
    column-gap: 10px;
    row-gap: 10px;

    align-items: center;
    justify-content: flex-start;
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

export { Layout, Categories, Title, Tablets, Form };
