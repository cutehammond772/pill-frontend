import { CreatingPillContainer } from "../container";
import { TextField } from "@mui/joy";

import { LayoutNamingPill, NamingPillTitleContent, NamingPillCategoriesContent } from "./create.naming.style";
import { PreviewPill } from "./create.naming.preview";

const NamingPillContent = () => {
  return (
    <CreatingPillContainer
      title="1. Naming Pill"
      complete={false}
      layout={LayoutNamingPill}
    >
      <PreviewPill
        title="How to make a nuturious food"
        author="cutehammond"
        likes={256}
        time="3 hours"
      />

      <NamingPillTitleContent>
        <span>Title</span>
        <TextField placeholder="Type in here..." fullWidth />
      </NamingPillTitleContent>

      <NamingPillCategoriesContent>
        <span>Categories</span>
      </NamingPillCategoriesContent>
    </CreatingPillContainer>
  );
};

export { NamingPillContent };
