import styled from "@emotion/styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const DropdownIcon = styled(KeyboardArrowDownIcon)`
  font-size: 2rem;
  line-height: 100%;

  color: var(--light);
`;

export const PillMenu = styled.div`
  width: auto;
  height: auto;

  border-radius: 999px;

  cursor: pointer;
  background: var(--bg-h-rb-f-c);

  & > .container {
    width: auto;
    height: auto;
    border-radius: inherit;

    margin: 5px;
    padding: 2px 15px 2px 20px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    column-gap: 5px;

    background-color: var(--dark);

    & > .title {
      font-weight: 500;
      font-size: 1.25rem;
      line-height: 100%;

      color: var(--light);
    }
  }

  // not mobile
  @media screen and (min-width: 768px) {
    // PillMenu는 모바일 홈페이지에서만 활성화된다.
    display: none;
  }
`;
