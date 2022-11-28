import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

const Blur = styled.div`
  filter: blur(4px);
  margin: 10px;
`;

const DummyContainer = styled.div<{
  dummyLayout?: SerializedStyles;
}>`
  position: relative;
  overflow: hidden;

  & > .fade {
    position: absolute;
    width: 100%;
    height: 100%;

    z-index: 1;

    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(0, 0, 0, 0) 25%,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0) 75%,
      rgba(255, 255, 255, 1) 100%
    );
  }

  // 맨 앞에 보여지는 컴포넌트에 대해 적용된다.
  & > .items {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    z-index: 2;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    row-gap: 100px;
  }

  // fade filter 뒤에 보여지는 dummy에 대해 적용된다.
  & > .dummies {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    z-index: 0;

    ${(props) => props.dummyLayout};
  }
`;

export { Blur, DummyContainer };
