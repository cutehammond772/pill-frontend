/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Layout = css`
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

export const DummyLayout = css`
  width: 2048px;
  height: auto;

  position: relative;
  left: 50%;
  transform: translateX(-50%);

  ${Animation};
`;

export const Form = styled.div`
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

  // tablet
  @media screen and (max-width: 992px) {
    max-width: 80%;
    padding: 10px;
  }
`;

export const Title = styled.div`
  padding: 15px;

  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 10px;

  & > .title {
    font-weight: 700;
    color: var(--dark);
    font-size: 1.5rem;
    line-height: 100%;

    text-transform: uppercase;
  }

  & > .input {
    position: relative;

    border: none;
    outline: none;
    border-bottom: 3px solid var(--dark);
    padding-bottom: 5px;

    font-weight: 700;
    font-size: 1.25rem;

    background-color: var(--panel);
    color: var(--dark);

    :disabled {
      filter: blur(1.5px);

      ::selection {
        background-color: var(--light);
      }
    }

    :focus {
      border-bottom-color: var(--primary);

      ::placeholder {
        color: var(--panel);

        transition: color 200ms;
      }
    }

    transition: filter 300ms, border-bottom-color 300ms;
  }

  // mobile
  @media screen and (max-width: 768px) {
    padding: 10px;

    & > .title {
      font-size: 1.25rem;
    }
  }
`;

export const Categories = styled.div`
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

  & > .title {
    font-weight: 700;
    color: var(--dark);
    font-size: 1.5rem;
    line-height: 100%;

    text-transform: uppercase;
  }

  // mobile
  @media screen and (max-width: 768px) {
    padding: 10px;
    row-gap: 15px;

    & > .title {
      font-size: 1.25rem;
    }
  }
`;
