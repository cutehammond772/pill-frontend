/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Layout = css`
  margin-top: 50px;
`;

const Animation = css`
  @keyframes tablets {
    from {
      left: 20%;
    }

    to {
      left: 80%;
    }
  }

  animation-name: tablets;
  animation-duration: 40s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

const DummyLayout = css`
  width: 2048px;
  height: auto;
  
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  ${Animation};
`;

const Form = styled.div`
  width: 600px;
  height: auto;

  border-radius: 15px;
  padding: 15px;
  box-shadow: 0px 0px 15px var(--shadow);

  box-sizing: border-box;

  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-flow: column wrap;
  row-gap: 20px;

  background-color: var(--panel);

  // mobile
  @media screen and (max-width: 768px) {
    width: 100%;
  }
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

export { Layout, Categories, Title, DummyLayout, Form, Animation };
