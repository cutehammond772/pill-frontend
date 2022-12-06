import styled from "@emotion/styled";
import { ColorAttributes } from "../../../GlobalStyles";

export const Container = styled.div`
  position: relative;
  width: auto;
  height: auto;

  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  row-gap: 30px;
`;

export const Form = styled.div`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 20px;

  // mobile, tablet의 경우 입력을 위에 위치시킨다.
  // 이는 가상 키보드로 인해 입력 창이 가려지는 것을 방지하기 위해서이다.
  @media screen and (max-width: 992px) {
    flex-direction: column-reverse;
  }
`;

export const Inputs = styled.div`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 20px;
`;

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;

  // mobile
  @media screen and (max-width: 768px) {
    display: flex;
    flex-flow: column;
    align-items: stretch;
    row-gap: 5px;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-flow: row;
  column-gap: 10px;
  align-items: center;

  color: var(--dark);

  & > .icon {
    font-size: 2rem;
  }

  & > .content {
    font-weight: 700;
    font-size: 1.75rem;
    line-height: 100%;
  }
`;

export const ImagePreview = styled.div`
  min-height: 300px;
  max-height: 400px;

  display: flex;
  justify-content: center;

  & > .image {
    border-radius: 15px;

    overflow: hidden;
    object-fit: contain;

    box-shadow: 0px 0px 5px var(--shadow);
  }

  & > .preview {
    padding: 20px;
    border-radius: 15px;

    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;

    & > .icon {
      font-size: 4rem;
      color: var(--dark);
    }

    & > .message {
      font-weight: 700;
      font-size: 1.5rem;
      text-align: center;

      word-break: keep-all;

      color: var(--dark);
    }
  }
`;

export const Input = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr 40px;
  row-gap: 5px;

  overflow: hidden;

  & > .label {
    grid-column: 1 / 3;
    font-size: 1rem;
  }

  & > .input {
    position: relative;
    min-width: 0;
    flex-grow: 1;

    border: none;
    border-bottom: 3px solid var(--sub);
    outline: none;

    font-size: 1rem;
    padding-right: 0.75rem;

    z-index: 0;

    background-color: var(--light);
    color: var(--dark);

    :disabled {
      filter: blur(1.5px);

      ::selection {
        background-color: var(--light);
      }
    }

    :focus {
      border-bottom-color: var(--primary);

      ::placeholder {
        color: var(--light);
        
        transition: color 200ms;
      }
    }

    transition: filter 300ms, border-bottom-color 300ms;
  }
`;

export const Button = styled.div<{
  bgColor: string;
  textColor: string;
  disabled: boolean;
}>`
  width: auto;
  height: auto;

  padding: 15px;
  border-radius: 15px;

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  column-gap: 8px;

  cursor: ${(props) => (!!props.disabled ? "default" : "pointer")};

  background-color: ${(props) =>
    props.disabled ? ColorAttributes.SUB : props.bgColor};
  color: ${(props) =>
    props.disabled ? ColorAttributes.LIGHT : props.textColor};

  & > .icon {
    font-size: 1.5rem;
    line-height: 100%;
  }

  & > .title {
    font-size: 1.1rem;
    line-height: 100%;

    white-space: nowrap;
  }

  :hover {
    filter: ${(props) => (props.disabled ? "none" : "brightness(0.7)")};
  }

  transition: filter 300ms;

  // mobile
  @media screen and (max-width: 768px) {
    column-gap: 5px;
    border-radius: 10px;

    & > .icon {
      font-size: 1.25rem;
    }

    & > .title {
      font-size: 1rem;
    }
  }
`;
