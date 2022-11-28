import styled from "@emotion/styled";

export const AuthButton = styled.div<{ bgColor: string; textColor: string }>`
  width: auto;
  height: auto;

  color: ${(props) => props.textColor};
  background-color: ${(props) => props.bgColor};

  & > .link {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    line-height: 100%;
    font-weight: 500;
    text-decoration: none;
    color: inherit;

    // desktop
    padding: 20px;
    column-gap: 10px;
  }

  :hover {
    filter: brightness(0.8);
    transition: filter 300ms;
  }

  transition: filter 300ms;

  // desktop
  border-radius: 20px;

  & * {
    // 아이콘과 텍스트 모두 적용하기 위해서이다.
    font-size: 1.25rem;
  }

  // mobile
  @media screen and (max-width: 768px) {
    border-radius: 25px;

    & * {
      font-size: 1.5rem;
    }

    & > .link {
      padding: 20px 25px 20px 25px;
      column-gap: 15px;
    }
  }
`;

