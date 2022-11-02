/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const LayoutMakingPill = css`
  display: flex;
  flex-flow: column;
  row-gap: 15px;
`;

const MakingPillIndexContent = styled.div`
  width: auto;
  height: 100px;
  background: grey;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;

  // Add Icon
  & > svg {
    font-size: 50px;
  }

  & > span {
    font-family: Inter;
    font-weight: 700;
    font-size: 30px;
    user-select: none;
  }
`;

export { LayoutMakingPill, MakingPillIndexContent };