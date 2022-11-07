import styled from "@emotion/styled";
import { DefaultLayout } from "../container/container.style";

const HeaderStyle = styled.header`
  position: sticky;
  top: 0;
  z-index: 9999;

  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  align-items: center;

  padding-top: 2rem;
  padding-bottom: 2rem;

  ${DefaultLayout};

  // Header Title
  & > span {
    font-weight: 700;
    font-size: 2.5rem;
    color: var(--dark);

    user-select: none;
  }
`;

export { HeaderStyle };
