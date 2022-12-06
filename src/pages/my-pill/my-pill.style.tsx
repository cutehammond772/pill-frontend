import styled from "@emotion/styled";

export const Container = styled.div`
  min-height: 1536px;
  margin-top: 256px;
  margin-bottom: 256px;
`;

export const UserCard = styled.div`
  width: auto;
  height: auto;
  
  border-radius: 20px;
  padding: 30px;
  
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 2fr 5fr;
  row-gap: 30px;
  column-gap: 30px;

  box-sizing: border-box;
  overflow: hidden;

  & > .profile {
    grid-row: 1 / 3;
    width: 200px;
    height: 200px;

    border-radius: 50%;
    background-color: var(--primary);

    :hover {
      transform: scale(1.05);
    }

    transition: transform 300ms;
  }

  & > .title {
    font-weight: 700;
    font-size: 2rem;
    line-height: 100%;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > .content {
    display: flex;
    flex-flow: row nowrap;
    row-gap: 15px;
    column-gap: 15px;

    & > * {
      padding: 15px;

      flex-grow: 1;
      border-radius: 15px;

      cursor: pointer;
      background-color: var(--blue);

      :hover {
        filter: brightness(1.1);
      }

      transition: filter 300ms;
    }
  }

  box-shadow: 0px 0px 10px var(--shadow);
`;