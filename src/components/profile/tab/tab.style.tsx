/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { Divider as DividerComponent } from "@mui/joy";

export const Layout = css`
  position: fixed;

  width: auto;
  height: auto;
  padding: 1rem;

  border-radius: 20px;
  
  background: var(--light);
  box-shadow: 0px 0px 30px var(--shadow);

  z-index: var(--z-header-tab);
`;

export const Title = styled.span`
  position: relative;
  top: 0.5rem;

  font-weight: 700;
  font-size: 2rem;
  
  color: var(--dark);
`;

export const Divider = styled(DividerComponent)`
  padding-top: 20px;
  padding-bottom: 10px;

  letter-spacing: 0.05rem;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;

  color: var(--dark);
`;

export const Menu = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 5px;
  row-gap: 5px;
  justify-content: center;
`;

export const GuestBanner = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  
  height: 200px;
  padding: 1rem;
  margin-top: 40px;
  border-radius: 15px;
  background: var(--bg-h-br-t-b);

  // ThumbUp Icon
  & > .icon {
    font-size: 4rem;
  }

  // Tect Content
  & > .content {
    color: var(--dark);
    text-align: center;
    font-size: 1rem;
  }
`;