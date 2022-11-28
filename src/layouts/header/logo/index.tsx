import * as React from "react";
import * as Style from "./logo.style";

const Logo = (props: { onClick?: () => void, title?: string }) => (
  <Style.Logo>
    <div className="icon" onClick={props.onClick} />
    <div className="title">{ props.title || "Pill" }</div>
  </Style.Logo>
);

export default React.memo(Logo);
