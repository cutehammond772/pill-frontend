import styled from "@emotion/styled";

export const Logo = styled.div`
  width: auto;
  height: auto;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  column-gap: 15px;

  cursor: pointer;

  & > .icon {
    width: 50px;
    height: 20px;
    border-radius: 10px;

    background: var(--bg-h-rb-f-c);
  }

  & > .title {
    line-height: 100%;
    font-weight: 700;
    font-size: 2.5rem;

    color: var(--light);
  }

  // tablet
  @media screen and (max-width: 992px) {
    column-gap: 10px;

    & > .title {
      font-size: 2rem;
    }
  }

  // mobile
  @media screen and (max-width: 768px) {
    // 모바일 페이지의 경우 기존 로고를 숨기고 PillMenu로 대신한다.
    display: none;
  }
`;
