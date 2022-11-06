import styled from "@emotion/styled";

const ContainerStyle = styled.div`
  position: relative;

  // Background는 전체 적용, 컨테이너 범위는 중앙 1024px가 되도록 한다.
  padding-left: calc(50% - 512px);
  padding-right: calc(50% - 512px);

  @media screen and (max-width: 1280px) {
    // Background는 전체 적용, 컨테이너 범위는 중앙 80%가 되도록 한다.
    padding-left: 10%;
    padding-right: 10%;
  }
`;

export { ContainerStyle };
