import * as React from "react";

import * as Style from "./pill.style";

const PillMenu = (props: { onClick?: () => void; title: string }) => {
  return (
    <Style.PillMenu onClick={props.onClick}>
      <div className="container">
        <div className="title">{props.title}</div>
        <Style.DropdownIcon />
      </div>
    </Style.PillMenu>
  );
};

export default React.memo(PillMenu);
