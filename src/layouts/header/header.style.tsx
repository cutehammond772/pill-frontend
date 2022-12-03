import styled from "@emotion/styled";
import { DefaultPageLayout } from "../page/page.style";

export const Header = styled.header`
  position: sticky;
  height: auto;
  padding-top: 40px;
  padding-bottom: 40px;

  z-index: var(--z-header);

  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  overflow: hidden;

  ${DefaultPageLayout};

  & > .default-menu {
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
    align-items: center;
  }

  & > .dropdown-menu {
    width: 100%;
    border-radius: 20px;
    padding-bottom: 20px;

    display: none;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    row-gap: 20px;

    transition: height 500ms, padding-bottom 500ms;

    & > .selected-menu {
      font-weight: 700;
      line-height: 100%;
      font-size: 2.5rem;

      color: var(--blue);
    }

    & > .menu {
      font-weight: 700;
      line-height: 100%;
      font-size: 2.5rem;

      cursor: pointer;

      color: var(--light);

      :hover {
        color: var(--pink);
      }

      transition: color 300ms;
    }
  }

  // mobile
  @media screen and (max-width: 768px) {
    padding-top: 20px;
    padding-bottom: 0px;

    & > .default-menu {
      padding-bottom: 20px;
    }

    & > .dropdown-menu {
      display: flex;
    }

    transition: padding 300ms, height 300ms ease-in-out;
  }

  background-color: var(--dark);
`;
