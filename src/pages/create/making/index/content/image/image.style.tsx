/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";

const ImageContentLayout = css`
  display: flex;
  flex-flow: column;
  justify-content: center;

  & > img {
    border-radius: 10px;
    background: #505050;

    width: auto;
    max-height: 512px;

    object-fit: contain;
  }
`;

const ImageContentTitleLayout = css`
  width: auto;
  align-self: stretch;
`;

export { ImageContentLayout, ImageContentTitleLayout };
