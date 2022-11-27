import styled from "@emotion/styled";
import { Button } from "@mui/joy";

const AuthButton = styled(Button)`
  & > .link {
    text-decoration: none;
    color: var(--light);
  }
`;

export { AuthButton };
