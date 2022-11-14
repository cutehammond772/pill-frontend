import styled from "@emotion/styled";
import { Button } from "@mui/joy";

const AuthButton = styled(Button)`
  // Link
  & > .link {
    text-decoration: none;
    color: var(--light);
  }
`;

export { AuthButton };
