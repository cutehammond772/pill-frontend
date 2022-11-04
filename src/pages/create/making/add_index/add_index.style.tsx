import styled from "@emotion/styled";
import { Button } from "@mui/material";

const AddIndexStyle = styled(Button)`
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
  color: #202020;
}

& > span {
  font-family: Inter;
  font-weight: 700;
  font-size: 30px;

  color: #202020;

  user-select: none;
}
`;

export { AddIndexStyle };