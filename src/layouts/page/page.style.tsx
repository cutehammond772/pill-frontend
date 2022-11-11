/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { SerializedStyles } from "@emotion/serialize";

const DefaultPageLayout = css`
  // Background는 전체 적용, 컨테이너 범위는 중앙 1024px가 되도록 한다.
  padding-left: calc(50% - 512px);
  padding-right: calc(50% - 512px);

  @media screen and (max-width: 1280px) {
    // Background는 전체 적용, 컨테이너 범위는 중앙 80%가 되도록 한다.
    padding-left: 10%;
    padding-right: 10%;
  }
`; 

const Page = styled.div<{ layout?: SerializedStyles }>`
  // 트랜지션을 위해 필요하다. 
  position: absolute;
  width: 100%;
  box-sizing: border-box;

  ${DefaultPageLayout};
  ${props => props.layout};
`;

const Container = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
`;

export { Page, Container, DefaultPageLayout };
