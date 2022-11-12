/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Layout = css`
  position: absolute;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px var(--shadow);

  background-color: white;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  align-items: center;
`;

const ImagePreview = styled.div`
  display: flex;
  justify-content: center;

  // Image
  & > img {
    min-width: 300px;
    min-height: 300px;
    max-width: 600px;
    max-height: 600px;

    background: var(--light);
    border-radius: 5px;
    object-fit: scale-down;
  }

  // Background
  & > div {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;

    min-width: 300px;
    min-height: 300px;
    max-width: 400px;
    max-height: 400px;

    background: var(--light);
    box-shadow: 0px 0px 5px var(--shadow);
    border-radius: 10px;
  }

  // Background Icon
  & > div > svg {
    font-size: 40px;
    color: var(--dark);
  }

  // Background Message
  & > div > span {
    text-align: center;
    align-self: center;

    padding-left: 20px;
    padding-right: 20px;

    color: var(--dark);
  }
`;

const Form = styled.div`
  display: flex;
  flex-flow: column;
  row-gap: 20px;
  min-width: 500px;

  // Title Container
  & > div:nth-of-type(1) {
    display: flex;
    flex-flow: row;
    column-gap: 5px;
  }

  & > div:nth-of-type(1) > svg {
    font-size: 1.5rem;
  }

  & > div:nth-of-type(1) > span {
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 100%;
  }
`;

const ImageInputForm = styled.div`
  display: flex;
  flex-flow: row;
  align-items: flex-end;
  column-gap: 5px;
`;

export { ImagePreview, Form, ImageInputForm, Layout };
