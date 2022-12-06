import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const AddIndexButton = styled(Button)`
  width: auto;
  height: auto;
  border-radius: 20px;
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 30px;

  box-shadow: 0px 0px 5px var(--shadow);

  & > .icon {
    font-size: 2.5rem;

    color: var(--dark);
  }

  & > .title {
    font-weight: 700;
    font-size: 2rem;

    color: var(--dark);
  }

  @media screen and (max-width: 992px) {
    padding: 8px;
    border-radius: 15px;
    column-gap: 20px;

    & > .icon {
      font-size: 2rem;
    }

    & > .title {
      font-size: 1.75rem;
    }
  }
`;
