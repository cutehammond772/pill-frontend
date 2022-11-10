import styled from "@emotion/styled";
import { DefaultLayout } from "../container/container.style";

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 888;

  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  align-items: center;

  box-shadow: 0px 5px 15px var(--shadow);

  padding-top: 2rem;
  padding-bottom: 2rem;

  ${DefaultLayout};
`;

const Title = styled.div`
  display: flex;
  flex-flow: row;
  column-gap: 15px;
  align-items: center;

  & > span:nth-of-type(1) {
    font-weight: 700;
    font-size: 2.5rem;
    color: var(--dark);
  }
`;

export { Header, Title };
