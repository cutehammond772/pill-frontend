import styled from "@emotion/styled";
import { DefaultPageLayout } from "../page/page.style";

const Footer = styled.footer`
  position: absolute;
  width: 100%;
  bottom: 0;

  z-index: var(--z-footer);
  height: var(--size-footer);
  box-sizing: border-box;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  
  background-color: var(--dark);

  & > * {
    font-size: 1.2rem;
    color: var(--light);
    user-select: none;
    text-decoration: none;
  }
  
  ${DefaultPageLayout};
`;

export { Footer };
