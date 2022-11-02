import styled from "@emotion/styled";
import * as React from "react";

import { Button } from "@mui/joy";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";

const ContainerStyle = styled.div`
  display: flex;
  column-gap: 10px;
`;

const TitleStyle = styled.h1`
  color: white;
  padding-top: 128px;
  font-size: 5rem;
`;

const GoToHomeButton = ({ children }: React.PropsWithChildren) => {
  return (
    <Button
      size="lg"
      variant="solid"
      color="primary"
      startDecorator={<HomeIcon />}
    >
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        {children}
      </Link>
    </Button>
  );
};

export { ContainerStyle, TitleStyle, GoToHomeButton };
