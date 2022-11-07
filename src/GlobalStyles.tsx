/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";

// default font
import "@fontsource/inter/500.css";

const style = css`
  html * {
    font-family: Inter, sans-serif !important;
  }

  :root {
    --light: #dddddd;
    --dark: #202020;
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

const DefaultText = styled.span`
  font-weight: 500;
  color: ${(props) => !!props.color ? props.color : "white"};
`;

export { GlobalStyles, DefaultText };
