/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { Button } from "@mui/joy";

export const ContainerLayout = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  justify-content: center;

  padding: 10px;
  background-color: rgba(255, 255, 255, 0);
`;

export const TitleLayout = css`
  grid-column: 1 / 3;
`;

export const AddContentButton = styled(Button)`
  width: auto;
  height: auto;
  border-radius: 15px;
  padding: 15px;

  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 2fr 3fr;
  align-items: center;

  & > * {
    text-align: left;
  }

  // Icon
  & > .icon {
    grid-row: 1 / 3;
    font-size: 2.75rem;
  }

  // Title
  & > .title {
    font-weight: 600;
    font-size: 1.5rem;
  }

  // Description
  & > .description {
    font-weight: 500;
    font-size: 1.25rem;
    padding-top: 10px;
  }
`;