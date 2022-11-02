import { CreatingPillContainer } from "../container";
import { LayoutMakingPill } from "./create.making.style";
import { MakingPillIndex } from "./create.making.index";

const MakingPillContent = () => {
  return (
    <CreatingPillContainer
      title="2. Making Pill"
      complete={false}
      layout={LayoutMakingPill}
    >
      <MakingPillIndex />
    </CreatingPillContainer>
  );
};

export { MakingPillContent };
