import styled from "@emotion/styled";

export const Title = styled.div`
  width: auto;
  height: auto;

  padding: 15px;
  background-color: var(--dark);

  display: flex;
  flex-flow: row;
  align-items: center;
  column-gap: 10px;

  border-radius: 20px 20px 0 0;

  & > .index {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--light);
    padding-left: 15px;
    padding-right: 15px;
  }

  @media screen and (max-width: 992px) {
    padding: 10px;
    column-gap: 5px;
    border-radius: 15px 15px 0 0;

    & > .index {
      font-size: 1.25rem;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
`;
