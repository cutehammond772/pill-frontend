import styled from "@emotion/styled";

export const Container = styled.div`
  min-height: 2048px;

  display: flex;
  flex-flow: column;
  row-gap: 20px;
`;

export const Title = styled.div`
  font-size: 2.75rem;
  font-weight: 700;

  margin-top: 256px;
  margin-bottom: 36px;
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-flow: column;
  row-gap: 20px;

  min-height: 1024px;
  border-bottom: 2px solid var(--dark);
`;

export const Result = styled.div`
  width: auto;
  min-height: 50px;
  border-radius: 15px;
  box-shadow: 0px 0px 5px var(--shadow);
  box-sizing: border-box;
  padding: 15px;

  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;

  // Result Type Icon
  & > .type {
    font-size: 2rem;
    justify-self: center;
  }

  // GoTo Icon
  & > .goto {
    font-size: 1.25rem;
    justify-self: center;
  }
`;

export const ResultContent = styled.div`
  margin-left: 10px;
  margin-right: 10px;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  row-gap: 10px;
`;

export const ResultTitle = styled.div`
  display: flex;
  flex-flow: row;
  column-gap: 20px;

  & > .title {
    font-size: 1.5rem;
    font-weight: 600;

    & > .keyword {
      background: lightgreen;
      border-radius: 5px;
    }
  }

  & > .subText {
    color: grey;
    align-self: center;
    line-height: 100%;
    font-size: 0.9rem;
  }
`;

export const ResultTagContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  column-gap: 5px;
  row-gap: 5px;
  align-items: center;
`;

export const ResultTag = styled.div`
  width: auto;
  height: auto;
  border-radius: 5px;
  background-color: var(--dark);
  padding: 5px 10px 5px 10px;
  color: var(--light);
  font-size: 0.8rem;

  display: flex;
  flex-flow: row;
  align-items: center;
  column-gap: 5px;
`;

export const SearchOptions = styled.div`
  display: flex;
  flex-flow: row wrap;
  column-gap: 10px;
  row-gap: 10px;
  align-items: center;
`;

export const SearchOption = styled.div<{ checked?: boolean }>`
  width: auto;
  height: 40px;
  border-radius: 20px;
  box-sizing: border-box;

  padding: 20px;

  display: flex;
  flex-flow: row;
  column-gap: 10px;
  justify-content: flex-end;
  align-items: center;

  background-color: ${(props) =>
    !!props.checked ? "lightgreen" : "var(--dark)"};

  transition: background-color 300ms;

  // Option Text
  & > .option {
    font-weight: 600;
    font-size: 1.2rem;
    color: ${(props) => (!!props.checked ? "var(--dark)" : "var(--light)")};

    transition: color 300ms;
  }

  // Check Icon
  & > .check {
    font-size: 1.25rem;
    color: var(--dark);

    display: ${(props) => (!!props.checked ? "inline" : "none")};
  }
`;

export const SearchBar = styled.div`
  width: auto;
  height: 80px;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;

  background: var(--light);
  display: flex;
  flex-flow: row;
  column-gap: 30px;
  align-items: center;

  box-shadow: 0px 0px 5px var(--shadow);

  & > .icon {
    font-size: 2.5rem;
  }
`;

export const PageOptions = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;
