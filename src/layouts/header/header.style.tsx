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

  padding-top: 40px;
  padding-bottom: 40px;

  ${DefaultPageLayout};

  // tablet (768px)
  @media screen and (max-width: 768px) {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  background-color: var(--dark);
`;

const Title = styled.div`
  display: flex;
  flex-flow: row;
  column-gap: 15px;
  align-items: center;

  & > .title {
    font-weight: 700;
    font-size: 40px;
    
    color: var(--light);
  }

  // desktop (992px)
  @media screen and (max-width: 992px) {
    & > .title {
      font-size: 30px;
    }
  }

  // tablet (768px)
  @media screen and (max-width: 768px) {
    & > .title {
      opacity: 0;
    }
  }
`;

export { Header, Title };
