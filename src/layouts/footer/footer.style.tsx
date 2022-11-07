import styled from "@emotion/styled";
import { DefaultLayout } from "../container/container.style";

const FooterContent = styled.footer`
  position: relative;
  bottom: 0;

  z-index: 1;
  height: 100px;
  box-sizing: border-box;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  
  background-color: var(--dark);
  
  ${DefaultLayout};
`;

export { FooterContent };
