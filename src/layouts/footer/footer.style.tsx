import styled from "@emotion/styled";
import { DefaultPageLayout } from "../page/page.style";

export const Footer = styled.footer`
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

  & > .copyright {
    font-size: 1.25rem;
    user-select: none;
    text-decoration: none;

    color: var(--light);
  }

  & > .languages {
    display: flex;
    flex-flow: row nowrap;
    column-gap: 10px;

    & > .button {
      padding: 5px;
      font-size: 1rem;
      border-radius: 10px;

      cursor: pointer;
      
      background-color: var(--light);
      color: var(--dark);
    }
  }

  ${DefaultPageLayout};
`;
