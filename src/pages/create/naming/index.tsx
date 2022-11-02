import { Container } from "../container";
import { TextField } from "@mui/joy";

import { Layout, TitleStyle, CategoriesStyle } from "./naming.style";
import { PillPreview } from "./preview";

const Content = () => {
  return (
    <Container title="1. Naming Pill" complete={false} layout={Layout}>
      <PillPreview
        title="How to make a nuturious food"
        author="cutehammond"
        likes={256}
        time="3 hours"
      />

      <TitleStyle>
        <span>Title</span>
        <TextField placeholder="Type in here..." fullWidth />
      </TitleStyle>

      <CategoriesStyle>
        <span>Categories</span>
      </CategoriesStyle>
    </Container>
  );
};

export { Content };
