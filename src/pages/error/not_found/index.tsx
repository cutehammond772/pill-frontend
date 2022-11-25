import { useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";

import * as Style from "./not_found.style";

import { Page } from "../../../layouts/page";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";

import { useEffect } from "react";
import { init } from "../../../utils/reducers/header";
import { useDispatch } from "react-redux";
import { useLocalization } from "../../../utils/hooks/localization";
import { L10N } from "../../../localization";

const NotFoundPage = () => {
  const { text } = useLocalization();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return (
    <Page layout={Style.Background}>
      <Style.Container>
        <Style.Title>{text(L10N.PAGE_NOT_FOUND_01)}</Style.Title>
        <Style.ButtonContainer>
          <Button
            size="lg"
            variant="solid"
            color="primary"
            startDecorator={<HomeIcon />}
            onClick={() => navigate("/")}
          >
            {text(L10N.PAGE_NOT_FOUND_02)}
          </Button>

          <Button
            size="lg"
            variant="solid"
            color="primary"
            startDecorator={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            {text(L10N.PAGE_NOT_FOUND_03)}
          </Button>
        </Style.ButtonContainer>
      </Style.Container>
    </Page>
  );
};

export { NotFoundPage };
