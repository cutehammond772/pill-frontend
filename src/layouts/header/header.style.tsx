import styled from "@emotion/styled";

const HeaderStyle = styled.header`
  position: sticky;
  z-index: 1;
  top: 0;

  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  align-items: center;

  padding-top: 2rem;
  padding-bottom: 2rem;

  // Background는 전체 적용, 컨테이너 범위는 중앙 1024px가 되도록 한다.
  padding-left: calc(50% - 512px);
  padding-right: calc(50% - 512px);

  @media screen and (max-width: 1280px) {
    // Background는 전체 적용, 컨테이너 범위는 중앙 80%가 되도록 한다.
    padding-left: 10%;
    padding-right: 10%;
  }

  // Header Title
  & > span {
    font-family: Inter;
    font-weight: 700;
    font-size: 2.5rem;
    color: white;

    user-select: none;
  }
`;

export { HeaderStyle };
