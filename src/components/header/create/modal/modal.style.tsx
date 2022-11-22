/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button as ButtonComponent } from "@mui/joy";

const Layout = css`
  position: absolute;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  min-width: 350px;
  max-width: 600px;

  box-shadow: 0px 0px 10px var(--shadow);
  background-color: var(--panel);

  box-sizing: border-box;
  border-radius: 20px;

  display: grid;
  grid-template-rows: 80px 1fr;
  align-items: stretch;
  justify-content: stretch;
`;

const InfoBanner = styled.div`
  width: auto;
  height: auto;
  padding: 20px 40px 20px 40px;
  border-radius: 20px 20px 0 0;

  background-color: var(--warning);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  column-gap: 20px;

  color: var(--light);

  & > .icon {
    font-size: 40px;
  }

  & > .title {
    font-size: 30px;
    line-height: 100%;
  }
`;

const Container = styled.div`
  background-color: var(--light);
  padding: 20px 40px 20px 40px;
  border-radius: 20px;

  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 40px;

  row-gap: 20px;
  column-gap: 10px;

  & > .content {
    grid-column: 1 / 3;
    font-size: 20px;
    margin-bottom: 20px;
  }

  @media only screen and (max-width: 1024px) {
    display: flex;
    flex-flow: column;
    row-gap: 10px;
    align-items: stretch;

    & > .content {
      font-size: 20px;
    }
  }
`;

const Button = styled(ButtonComponent)`
  font-size: 18px;
`;

export { Layout, InfoBanner, Container, Button };
