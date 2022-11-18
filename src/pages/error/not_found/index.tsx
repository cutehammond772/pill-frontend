import { useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";

import * as Style from "./not_found.style";

import { Page } from "../../../layouts/page";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";

import { useEffect } from "react";
import { initHeader } from "../../../utils/reducers/header";
import { useDispatch } from "react-redux";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initHeader());
  }, [dispatch]);

  return (
    <Page layout={Style.Background}>
      <Style.Container>
        <Style.Title>404 Not Found.</Style.Title>
        <Style.ButtonContainer>
          <Button
            size="lg"
            variant="solid"
            color="primary"
            startDecorator={<HomeIcon />}
            onClick={() => navigate("/")}
          >
            Go to Home
          </Button>

          <Button
            size="lg"
            variant="solid"
            color="primary"
            startDecorator={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Go to Previous Page
          </Button>
        </Style.ButtonContainer>
      </Style.Container>
    </Page>
  );
};

export { NotFoundPage };
