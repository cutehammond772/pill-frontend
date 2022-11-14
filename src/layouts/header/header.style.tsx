import styled from "@emotion/styled";
import { DefaultPageLayout } from "../page/page.style";

const Header = styled.header`
  position: sticky;
  top: 0;

  z-index: var(--z-header);

  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  align-items: center;

  box-shadow: 0px 5px 15px var(--shadow);

  padding-top: 2rem;
  padding-bottom: 2rem;

  ${DefaultPageLayout};
`;

const Title = styled.div`
  display: flex;
  flex-flow: row;
  column-gap: 15px;
  align-items: center;

  & > .title {
    font-weight: 700;
    font-size: 2.5rem;
    
    color: var(--dark);
  }
`;

export { Header, Title };
