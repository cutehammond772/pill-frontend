import styled from "@emotion/styled";

const Container = styled.div`
  min-height: 2048px;

  display: flex;
  flex-flow: column;
  row-gap: 20px;
`;

const Title = styled.div`
  font-size: 45px;
  font-weight: 700;

  margin-top: 256px;
  margin-bottom: 36px;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-flow: column;
  row-gap: 20px;

  min-height: 1024px;
  border-bottom: 2px solid var(--dark);
`;

const Result = styled.div`
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
    font-size: 30px;
    justify-self: center;
  }

  // GoTo Icon
  & > .goto {
    font-size: 20px;
    justify-self: center;
  }
`;

const ResultContent = styled.div`
  margin-left: 10px;
  margin-right: 10px;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  row-gap: 10px;
`;

const ResultTitle = styled.div`
  display: flex;
  flex-flow: row;
  column-gap: 20px;

  & > .title {
    font-size: 25px;
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
    font-size: 18px;
  }
`;

const ResultTagContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  column-gap: 5px;
  row-gap: 5px;
  align-items: center;
`;

const ResultTag = styled.div`
  width: auto;
  height: auto;
  border-radius: 5px;
  background-color: var(--dark);
  padding: 5px 10px 5px 10px;
  color: var(--light);
  font-size: 14px;

  display: flex;
  flex-flow: row;
  align-items: center;
  column-gap: 5px;
`;

const SearchOptions = styled.div`
  display: flex;
  flex-flow: row wrap;
  column-gap: 10px;
  row-gap: 10px;
  align-items: center;
`;

const SearchOption = styled.div<{ checked?: boolean }>`
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
    font-size: 18px;
    color: ${(props) => (!!props.checked ? "var(--dark)" : "var(--light)")};

    transition: color 300ms;
  }

  // Check Icon
  & > .check {
    font-size: 20px;
    color: var(--dark);

    display: ${(props) => (!!props.checked ? "inline" : "none")};
  }
`;

const SearchBar = styled.div`
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
    font-size: 40px;
  }
`;

const PageOptions = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

export {
  Container,
  Title,
  Result,
  ResultContainer,
  ResultContent,
  ResultTitle,
  ResultTagContainer,
  ResultTag,
  SearchOptions,
  SearchOption,
  SearchBar,
  PageOptions,
};
