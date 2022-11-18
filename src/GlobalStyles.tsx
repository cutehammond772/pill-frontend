/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

// default font
import "@fontsource/inter/500.css";
import "@fontsource/noto-sans-kr/500.css";

const style = css`
  html * {
    font-family: "Inter", "Noto Sans KR", sans-serif !important;
    user-select: none;
  }

  :root {
    --light: white;
    --dark: #303030;
    --shadow: #aaaaaa;
    --sub: grey;

    --z-header: 1000;
    --z-header-tab: 1001;
    --z-header-profile: 1002;

    --z-page: 700;
    --z-footer: 800;

    --z-modal: 1100;

    --size-footer: 100px;
  }

  html {
    width: 100%;
    height: 100%;

    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  body {
    width: 100%;
    height: auto;

    position: relative;
    margin: 0;
  }
`;

const GlobalStyles = () => {
  return <Global styles={style} />;
};

export default GlobalStyles;
