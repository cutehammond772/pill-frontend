/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TransitionGroup as TransitionGroupComponent } from "react-transition-group";

const Layout = css`
  display: flex;
  flex-flow: column;
  row-gap: 15px;
`;

const TransitionGroup = styled(TransitionGroupComponent)`
  display: flex;
  flex-flow: column;
  row-gap: 15px;
`;

export { Layout, TransitionGroup };
