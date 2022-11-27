/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { SerializedStyles } from "@emotion/serialize";

const DefaultPageLayout = css`
  // Background는 전체 적용, 컨테이너 범위는 중앙 1024px가 되도록 한다.

  padding-left: 36px;
  padding-right: 36px;

  // tablet (768px)
  @media screen and (min-width: 768px) {
    padding-left: 5%;
    padding-right: 5%;
  }

  // desktop (992px)
  @media screen and (min-width: 992px) {
    padding-left: 10%;
    padding-right: 10%;
  }

  // large desktop (1500px * 0.8 = 1200px)
  @media screen and (min-width: 1500px) {
    padding-left: calc(50% - 600px);
    padding-right: calc(50% - 600px);
  }
`;

const Page = styled.div<{ layout?: SerializedStyles }>`
  // 트랜지션을 위해 필요하다.
  position: absolute;
  width: 100%;
  box-sizing: border-box;

  ${DefaultPageLayout};
  ${(props) => props.layout};
`;

const Container = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
`;

export { Page, Container, DefaultPageLayout };
