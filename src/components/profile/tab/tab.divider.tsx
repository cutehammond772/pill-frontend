
import * as Style from "./tab.style";

interface DividerProps {
  title: string;
}

const Divider = (props: DividerProps) => {
  return (
    <Style.Divider>
        {props.title}
    </Style.Divider>
  );
};

export { Divider };
