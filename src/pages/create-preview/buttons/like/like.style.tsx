import styled from "@emotion/styled";

export const Button = styled.div`
  width: auto;
  height: auto;

  display: flex;
  flex-flow: row nowrap;
  column-gap: 10px;
  align-items: center;

  border-radius: 20px;
  background-color: var(--dark);

  padding: 10px 20px 10px 20px;

  & > .icon {
    color: var(--light);
    line-height: 100%;

    display: flex;
  }

  & > .count {
    color: var(--light);
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 100%;
  }

  :hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px var(--shadow);
  }

  & {
    transition: box-shadow 400ms, background-color 300ms;
  }

  & > * {
    transition: color 300ms;
  }
`;