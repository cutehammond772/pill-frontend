import styled from "@emotion/styled";
import { DefaultPageLayout } from "../page/page.style";

const Header = styled.header`
  position: sticky;
  height: 120px;

  z-index: var(--z-header);

  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  align-items: center;

  ${DefaultPageLayout};

  // mobile
  @media screen and (max-width: 768px) {
    height: 80px;
    padding: 10px 20px 10px 20px;

    transition: padding 300ms, height 300ms;
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

  // tablet
  @media screen and (max-width: 992px) {
    & > .title {
      font-size: 30px;
    }
  }

  // mobile
  @media screen and (max-width: 768px) {
    & > .title {
      opacity: 0;
    }
  }
`;

export { Header, Title };
