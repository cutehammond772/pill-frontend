import styled from "@emotion/styled";
import { Button } from "@mui/joy";

const TitleStyle = styled.div`
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

const TitleEditButtonStyle = styled(Button)`
  width: auto;
  height: auto;
  border-radius: 8px;

  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;

  background: #bbbbbb;

  display: flex;
  flex-flow: row;
  flex-grow: 1;
  justify-content: space-between;
  align-self: stretch;

  font-family: Inter;
  font-weight: 700;
  font-size: 1rem;
  color: #202020;
`;

export { TitleStyle, TitleEditButtonStyle };
