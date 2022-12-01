import { useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";

import * as Style from "./not-found.style";

import { Page } from "../../../layouts/page";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";

import { useI18n } from "../../../utils/hooks/i18n";
import { I18N } from "../../../utils/i18n";
import { usePageSelect } from "../../../utils/hooks/header/page-select";
import { EmptyHeaderSignature, EmptyMenus } from "../../../components/header/empty";

const NotFoundPage = () => {
  usePageSelect(EmptyHeaderSignature, EmptyMenus.PAGE);
  
  const { text } = useI18n();
  const navigate = useNavigate();

  return (
    <Page layout={Style.Background}>
      <Style.Container>
        <Style.Title>{text(I18N.PAGE_NOT_FOUND_01)}</Style.Title>
        <Style.ButtonContainer>
          <Button
            size="lg"
            variant="solid"
            color="primary"
            startDecorator={<HomeIcon />}
            onClick={() => navigate("/")}
          >
            {text(I18N.PAGE_NOT_FOUND_02)}
          </Button>

          <Button
            size="lg"
            variant="solid"
            color="primary"
            startDecorator={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            {text(I18N.PAGE_NOT_FOUND_03)}
          </Button>
        </Style.ButtonContainer>
      </Style.Container>
    </Page>
  );
};

export default NotFoundPage;
