import { Header } from "../../../layouts/header";
import { Footer } from "../../../layouts/footer";
import { Container } from "../../../layouts/container";

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";

import { Box } from "@mui/material";
import * as Style from "./not_found.style";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ height: "1536px" }}>
          <Style.Title>404 Not Found.</Style.Title>

          <Style.Container>
            <Style.GoToHomeButton>Go to Home</Style.GoToHomeButton>

            <Button
              size="lg"
              variant="solid"
              color="primary"
              startDecorator={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Go to Previous Page
            </Button>
          </Style.Container>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export { NotFoundPage };
