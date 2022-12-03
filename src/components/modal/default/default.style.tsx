/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Layout = css`
  z-index: var(--z-header-tab);
  background: var(--dark);
  border-radius: 20px;

  position: absolute;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px var(--dark);
  overflow: hidden;

  & > .container {
    position: relative;
    overflow-y: auto;
    padding: 30px;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  // Not mobile
  @media screen and (min-width: 768px) {
    top: 50%;
    transform: translateY(-50%);

    & > .container {
      max-height: 600px;
    }
  }

  // desktop ~
  @media screen and (min-width: 992px) {
    margin-left: calc(50% - 446.4px);
    margin-right: calc(50% - 446.4px);

    width: 892.8px;
  }

  // tablet
  @media screen and (max-width: 992px) {
    margin-left: 5%;
    margin-right: 5%;

    width: 90%;
  }

  // mobile
  @media screen and (max-width: 768px) {
    bottom: 0px;
    transform: none;

    border-radius: 30px 30px 0px 0px;

    margin-left: 36px;
    margin-right: 36px;

    width: calc(100% - 72px);

    & > .container {
      max-height: 400px;
    }
  }
`;

export const Pill = styled.div`
  position: absolute;

  width: 700px;
  height: 300px;

  border-radius: 150px;

  bottom: 0px;
  left: -100px;

  transform: rotate(-30deg);

  background: var(--bg-h-rb-f-b);
  filter: blur(40px);

  z-index: -1;

  // mobile
  @media screen and (max-width: 768px) {
    width: 630px;
    height: 270px;

    border-radius: 135px;

    bottom: 0px;
    left: -90px;
  }
`;
