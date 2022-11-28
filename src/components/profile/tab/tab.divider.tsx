import * as React from "react";
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

export default React.memo(Divider);
