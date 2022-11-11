import styled from "@emotion/styled";
import { Button } from "@mui/joy";

const AuthButton = styled(Button)`
  & > a {
    text-decoration: none;
    color: var(--light);
  }
`;

export { AuthButton };
