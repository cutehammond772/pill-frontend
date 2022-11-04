import styled from "@emotion/styled";
import { Button } from "@mui/joy";

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

  // Remove Icon
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

const TitleEditButtonStyle = styled(Button)`
  width: auto;
  height: auto;
  padding: 5px;
  border-radius: 8px;
  background: #bbbbbb;
  flex-grow: 1;
  align-self: stretch;
  display: flex;
  font-family: Inter;
  font-weight: 700;
  font-size: 1rem;
  color: #202020;
  padding-left: 10px;
  padding-right: 10px;
  flex-flow: row;
  justify-content: space-between;
`;

export { IndexContainerStyle, IndexContainerTitleStyle, AddContentContainerStyle, TitleEditButtonStyle };
