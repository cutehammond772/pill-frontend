/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";

const Visible = css`
  opacity: 1;
`;
const Invisible = css`
  opacity: 0;
`;

const Blur = css`
  backdrop-filter: blur(8px);
`;
const NoBlur = css`
  backdrop-filter: none;
`;

export { Visible, Invisible, Blur, NoBlur };
