import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-flow: row;
  column-gap: 3px;
  float: right;
`;

const Info = styled.div`
  display: flex;
  column-gap: 30px;
  flex-flow: row;
  padding-right: 20px;
  align-items: center;

  // Point Chip
  & > div:nth-of-type(1) {
    color: var(--light);
  }
`;

export { Container, Info };
