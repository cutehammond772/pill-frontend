/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";

import "@fontsource/inter/500.css";

const style = css`
  html {
    font-family: "Inter", sans-serif;
  }

  /* Basic CSS */

  :root {
    --bgcolor: #202020;
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
    
    background: var(--bgcolor);
  }
`;

const GlobalStyles = () => {
  return <Global styles={style} />;
};

const DefaultText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  color: ${(props) => !!props.color ? props.color : "white"};
`;

export { GlobalStyles, DefaultText };
