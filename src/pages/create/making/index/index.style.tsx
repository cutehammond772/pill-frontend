import styled from "@emotion/styled";

export const IndexContainer = styled.div`
  width: auto;
  height: auto;

  border-radius: 20px;
  box-shadow: 0px 0px 5px var(--shadow);

  display: flex;
  flex-flow: column;

  overflow: hidden;
  background-color: var(--panel);

  @media screen and (max-width: 992px){
    border-radius: 15px;
  }
`;
