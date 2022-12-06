/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button as ButtonComponent } from "@mui/joy";

export const Layout = css`
  position: absolute;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  min-width: 400px;
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

export const InfoBanner = styled.div`
  width: auto;
  height: auto;
  padding: 20px 40px 20px 40px;
  border-radius: 20px 20px 0 0;

  background-color: var(--danger);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  column-gap: 20px;

  color: var(--light);

  & > .icon {
    font-size: 2.5rem;
  }

  & > .title {
    font-size: 2rem;
    line-height: 100%;
  }
`;

export const Container = styled.div`
  background-color: var(--light);
  padding: 20px 40px 20px 40px;
  border-radius: 20px;

  // 수정 필요
  display: flex;
  flex-flow: column nowrap;

  row-gap: 20px;
  column-gap: 10px;

  & > .content {
    grid-column: 1 / 3;
    margin-bottom: 20px;
    
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 150%;
  }
`;

export const Button = styled(ButtonComponent)`
  font-size: 1.25rem;
`;
