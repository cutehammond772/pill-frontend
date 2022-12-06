import styled from "@emotion/styled";
import { TransitionGroup as TransitionGroupComponent } from "react-transition-group";
import { ColorAttributes } from "../../../../GlobalStyles";

export const EDIT_WIDTH = "160px";
export const BUTTON_WIDTH = "80px";

export const Container = styled.div`
  width: ${BUTTON_WIDTH};
  height: auto;

  display: flex;
  flex-flow: row nowrap;
  column-gap: 10px;
  border-radius: 1.5rem;

  transition: width 500ms;
  overflow: hidden;

  box-sizing: border-box;
  position: relative;
`;

export const TransitionGroup = styled(TransitionGroupComponent)`
  display: flex;
  flex-flow: row wrap;
  column-gap: 10px;
  row-gap: 10px;

  align-items: center;
  justify-content: flex-start;
`;

export const Button = styled.button<{
  addButton?: boolean;
}>`
  width: ${(props) => (!!props.addButton ? "100%" : "auto")};
  height: auto;

  font-size: 1rem;
  font-weight: 500;

  border-radius: 1.5rem;
  padding: 0.4rem 0.6rem 0.4rem 0.8rem;
  line-height: 100%;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;

  cursor: pointer;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  column-gap: 0.4rem;

  border: none;

  color: ${(props) =>
    !!props.addButton ? ColorAttributes.LIGHT : ColorAttributes.DARK};
  background: ${(props) =>
    !!props.addButton ? ColorAttributes.DARK : "var(--bg-h-br-t-a)"};
`;

export const Input = styled.input`
  width: 100%;
  height: auto;

  font-size: 1rem;
  font-weight: 500;

  padding: 0.4rem 0.6rem 0.4rem 0.8rem;
  line-height: 100%;

  text-align: center;

  background-color: var(--dark);
  color: var(--light);

  letter-spacing: 1px;

  :focus {
    border: none;
    outline: none;
    line-height: 100%;
  }

  ::placeholder {
    color: var(--light);
  }
`;
