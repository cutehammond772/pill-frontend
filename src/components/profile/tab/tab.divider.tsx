
import { DividerStyle } from "./tab.style";

const Divider = ({ title }: { title: string }) => {
  return (
    <DividerStyle>
        {title}
    </DividerStyle>
  );
};

export { Divider };
