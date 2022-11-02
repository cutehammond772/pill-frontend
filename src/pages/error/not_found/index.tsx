import { Header } from "../../../layouts/header";
import { Footer } from "../../../layouts/footer";
import { Container } from "../../../layouts/container";

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";

import { Box } from "@mui/material";
import { GoToHomeButton, ContainerStyle, TitleStyle } from "./not_found.style";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header noSearchBar />
      <Box sx={{ height: "2048px" }}>
        <TitleStyle>404 Not Found.</TitleStyle>

        <ContainerStyle>
          <GoToHomeButton>Go to Home</GoToHomeButton>

          <Button
            size="lg"
            variant="solid"
            color="primary"
            startDecorator={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Go to Previous Page
          </Button>
        </ContainerStyle>
      </Box>
      <Footer />
    </Container>
  );
};

export { NotFoundPage };
