/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";

export const ImageContentLayout = css`
  display: flex;
  flex-flow: column;
  justify-content: center;

  & > .image {
    border-radius: 10px;
    background: var(--light);

    width: auto;
    max-height: 512px;

    object-fit: cover;
  }
`;

export const ImageContentTitleLayout = css`
  width: auto;
  align-self: stretch;
`;
