import styled from "@emotion/styled";

export const Button = styled.div<{
  textColor: string;
  bgColor: string;
  disabled: boolean;
}>`
  width: auto;
  height: auto;

  padding: 10px;
  border-radius: 15px;

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  column-gap: 8px;

  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  white-space: nowrap;

  background-color: var(--dark);
  color: var(--light);
  outline: 2px solid var(--light);

  :hover {
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.textColor};
    outline-color: transparent;
  }

  transition: background-color 300ms, color 300ms, outline-color 300ms;

  & > .icon {
    font-size: 1.5rem;
  }

  & > .content {
    font-size: 1rem;
    line-height: 100%;
  }

  // tablet
  @media screen and (max-width: 992px) {
    padding: 8px;
    border-radius: 10px;
    column-gap: 5px;
    outline: none;
    
    & > .icon {
      font-size: 1.2rem;
    }

    & > .content {
      font-size: 0.75rem;
    }

    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.textColor};
  }

  @media screen and (max-width: 768px) {
    & > .content {
      display: none;
    }
  }
`;

export const OpenButton = styled.div<{ open: boolean; disabled: boolean }>`
  width: auto;
  height: auto;

  margin-top: auto;
  margin-bottom: auto;

  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  transform: ${(props) => (props.open ? "rotateY(180deg)" : "none")};
  transition: transform 600ms;

  & > * {
    display: block;
    font-size: 2rem;
    color: var(--dark);
  }
`;
