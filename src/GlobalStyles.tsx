/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";

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
  }

  html {
    width: 100%;
    height: 100%;

    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  body {
    width: 100%;
    height: 100%;

    margin: 0;
  }
`;

const GlobalStyles = () => {
  return <Global styles={style} />;
};

export { GlobalStyles };
