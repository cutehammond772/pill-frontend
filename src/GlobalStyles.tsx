/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

// default font
import "@fontsource/inter/500.css";
import "@fontsource/noto-sans-kr/500.css";

export const ColorAttributes = {
  LIGHT: "var(--light)",
  DARK: "var(--dark)",
  PANEL: "var(--white)",
  SHADOW: "var(--shadow)",

  RED: "var(--red)",
  PINK: "var(--pink)",
  BLUE: "var(--blue)",
  PURPLE: "var(--purple)",
  
  SUCCESS: "var(--success)",
  PRIMARY: "var(--primary)",
  SUB: "var(--sub)",
  WARNING: "var(--warning)",
  DANGER: "var(--danger)",
} as const;

export type ColorAttribute = typeof ColorAttributes[keyof typeof ColorAttributes];

const style = css`
  html * {
    font-family: "Inter", "Noto Sans KR", sans-serif !important;
    user-select: none;
  }

  :root {
    // Default Colors
    --panel: white;
    --light: white;
    --dark: #303030;

    --shadow: #aaaaaa;
    
    --red: red;
    --pink: pink;
    --blue: skyblue;
    --purple: #9a19b4;
    
    --success: #17ac1e;
    --primary: #4141dd;
    --sub: #707070;
    --warning: #ffae00;
    --danger: #9c0000;

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

    // Screen Sizes
    --large-desktop: 1200px;
    --desktop: 992px;
    --tablet: 768px;
    --mobile: 576px;
  }

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;

    position: relative;
    box-sizing: border-box;
    scroll-behavior: smooth;
    
    ::-webkit-scrollbar {
      display: none;
    }
  }

`;

const GlobalStyles = () => {
  return <Global styles={style} />;
};

export default GlobalStyles;
