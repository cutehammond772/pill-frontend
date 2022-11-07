
import { DividerStyle } from "./tab.style";

interface DividerProps {
  title: string;
}

const Divider = (props: DividerProps) => {
  return (
    <DividerStyle>
        {props.title}
    </DividerStyle>
  );
};

export { Divider };
