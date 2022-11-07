import styled from "@emotion/styled";

const IndexContainerStyle = styled.div`
  width: auto;
  height: auto;

  border-radius: 20px;
  box-shadow: 0px 0px 10px var(--light);
  padding: 15px;

  display: flex;
  flex-flow: column;
  row-gap: 15px;

  & > div {
    box-shadow: 0px 5px 20px var(--light);
    border-radius: 12px;
  }
`;

export { IndexContainerStyle };
