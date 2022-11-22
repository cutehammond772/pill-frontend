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
    // Default Colors
    --light: white;
    --dark: #303030;

    --shadow: #aaaaaa;
    --sub: grey;

    --red: red;
    --pink: pink;
    --blue: lightblue;
    --panel: white;

    --warning: darkred;

    // Default Background
    // --bg-(1)-(2)-(3)-(4)
    // (1): [v]: vertical ('top' to 'bottom'), [h]: horizontal ('left' to 'right')
    // (2): [br]: 'blue' to 'red', [rb]: 'red' to 'blue'
    // (3): [t]: turn 45 degrees (clockwise), [f]: forward (= as it is)
    // (4): [a, b, c]: opacity value (=> 0.2, 0.5, 1.0)

    --bg-v-br-f-a: linear-gradient(
      0deg,
      hsla(339, 100%, 55%, 0.2) 0%,
      hsla(197, 100%, 64%, 0.2) 100%
    );

    --bg-v-br-f-b: linear-gradient(
      0deg,
      hsla(339, 100%, 55%, 0.5) 0%,
      hsla(197, 100%, 64%, 0.5) 100%
    );

    --bg-v-br-f-c: linear-gradient(
      0deg,
      hsla(339, 100%, 55%, 1) 0%,
      hsla(197, 100%, 64%, 1) 100%
    );

    --bg-v-br-t-a: linear-gradient(
      45deg,
      hsla(339, 100%, 55%, 0.2) 0%,
      hsla(197, 100%, 64%, 0.2) 100%
    );

    --bg-v-br-t-b: linear-gradient(
      45deg,
      hsla(339, 100%, 55%, 0.5) 0%,
      hsla(197, 100%, 64%, 0.5) 100%
    );

    --bg-v-br-t-c: linear-gradient(
      45deg,
      hsla(339, 100%, 55%, 1) 0%,
      hsla(197, 100%, 64%, 1) 100%
    );

    --bg-v-rb-f-a: linear-gradient(
      0deg,
      hsla(197, 100%, 64%, 0.2) 0%,
      hsla(339, 100%, 55%, 0.2) 100%,
    );

    --bg-v-rb-f-b: linear-gradient(
      0deg,
      hsla(197, 100%, 64%, 0.5) 0%,
      hsla(339, 100%, 55%, 0.5) 100%
    );

    --bg-v-rb-f-c: linear-gradient(
      0deg,
      hsla(197, 100%, 64%, 1) 0%,
      hsla(339, 100%, 55%, 1) 100%
    );

    --bg-v-rb-t-a: linear-gradient(
      45deg,
      hsla(197, 100%, 64%, 0.2) 0%,
      hsla(339, 100%, 55%, 0.2) 100%
    );

    --bg-v-rb-t-b: linear-gradient(
      45deg,
      hsla(197, 100%, 64%, 0.5) 0%,
      hsla(339, 100%, 55%, 0.5) 100%
    );

    --bg-v-rb-t-c: linear-gradient(
      45deg,
      hsla(197, 100%, 64%, 1) 0%,
      hsla(339, 100%, 55%, 1) 100%
    );
    
    --bg-h-br-f-a: linear-gradient(
      -90deg,
      hsla(339, 100%, 55%, 0.2) 0%,
      hsla(197, 100%, 64%, 0.2) 100%
    );

    --bg-h-br-f-b: linear-gradient(
      -90deg,
      hsla(339, 100%, 55%, 0.5) 0%,
      hsla(197, 100%, 64%, 0.5) 100%
    );

    --bg-h-br-f-c: linear-gradient(
      -90deg,
      hsla(339, 100%, 55%, 1) 0%,
      hsla(197, 100%, 64%, 1) 100%
    );

    --bg-h-br-t-a: linear-gradient(
      -45deg,
      hsla(339, 100%, 55%, 0.2) 0%,
      hsla(197, 100%, 64%, 0.2) 100%
    );

    --bg-h-br-t-b: linear-gradient(
      -45deg,
      hsla(339, 100%, 55%, 0.5) 0%,
      hsla(197, 100%, 64%, 0.5) 100%
    );

    --bg-h-br-t-c: linear-gradient(
      -45deg,
      hsla(339, 100%, 55%, 1) 0%,
      hsla(197, 100%, 64%, 1) 100%
    );

    --bg-h-rb-f-a: linear-gradient(
      -90deg,
      hsla(197, 100%, 64%, 0.2) 0%,
      hsla(339, 100%, 55%, 0.2) 100%,
    );

    --bg-h-rb-f-b: linear-gradient(
      -90deg,
      hsla(197, 100%, 64%, 0.5) 0%,
      hsla(339, 100%, 55%, 0.5) 100%
    );

    --bg-h-rb-f-c: linear-gradient(
      -90deg,
      hsla(197, 100%, 64%, 1) 0%,
      hsla(339, 100%, 55%, 1) 100%
    );

    --bg-h-rb-t-a: linear-gradient(
      -45deg,
      hsla(197, 100%, 64%, 0.2) 0%,
      hsla(339, 100%, 55%, 0.2) 100%
    );

    --bg-h-rb-t-b: linear-gradient(
      -45deg,
      hsla(197, 100%, 64%, 0.5) 0%,
      hsla(339, 100%, 55%, 0.5) 100%
    );

    --bg-h-rb-t-c: linear-gradient(
      -45deg,
      hsla(197, 100%, 64%, 1) 0%,
      hsla(339, 100%, 55%, 1) 100%
    );

    // Z Indexes
    --z-header: 1000;
    --z-header-tab: 1001;
    --z-header-profile: 1002;
    --z-page: 700;
    --z-footer: 800;
    --z-modal: 1100;

    // Footer Size
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
