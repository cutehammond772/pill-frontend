/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { Button } from "@mui/joy";

const AddContentLayout = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
`;

const AddContentTitleLayout = css`
  grid-column: 1 / 3;
`;

const AddContentButtonStyle = styled(Button)`
  width: auto;
  height: auto;
  border-radius: 5px;
  padding: 15px;

  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 2fr 3fr;
  align-items: center;

  & > * {
    text-align: left;
  }

  & > svg:nth-of-type(1) {
    grid-row: 1 / 3;
    font-size: 45px;
  }

  // Title
  & > span:nth-of-type(1) {
    font-family: Inter;
    font-weight: 600;
    font-size: 20px;
  }

  // Description
  & > span:nth-of-type(2) {
    font-family: Inter;
    font-weight: 500;
    font-size: 18px;
    padding-top: 10px;
  }
`;

export { AddContentLayout, AddContentTitleLayout, AddContentButtonStyle };