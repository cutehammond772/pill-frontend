/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Layout = css`
  display: flex;
  flex-flow: column;
  row-gap: 15px;
`;

const AddIndexStyle = styled.div`
  width: auto;
  height: auto;
  background: grey;
  border-radius: 10px;

  padding: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;

  // Add Icon
  & > svg {
    font-size: 50px;
  }

  & > span {
    font-family: Inter;
    font-weight: 700;
    font-size: 30px;
    user-select: none;
  }
`;

const IndexContainerStyle = styled.div`
  width: auto;
  height: auto;
  background: grey;
  border-radius: 10px;

  padding: 15px;

  display: flex;
  flex-flow: column;
  row-gap: 15px;
`;

const IndexContainerTitleStyle = styled.div`
  width: auto;
  height: auto;
  border-radius: 5px;
  padding: 10px;

  background: white;

  display: flex;
  flex-flow: row;
  align-items: center;
  column-gap: 10px;

  // Index Signature
  & > span:nth-of-type(1) {
    font-family: Inter;
    font-size: 20px;
    font-weight: 600;
    color: black;
    padding-left: 15px;
    padding-right: 15px;
    user-select: none;
  }

  // Menu Icon
  & > svg:nth-of-type(1) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const AddContentContainerStyle = styled.div`
  width: auto;
  height: auto;
  border-radius: 5px;
  padding: 10px;

  background: white;

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  row-gap: 10px;
`;

export {
  Layout,
  AddIndexStyle,
  IndexContainerStyle,
  IndexContainerTitleStyle,
  AddContentContainerStyle,
};
