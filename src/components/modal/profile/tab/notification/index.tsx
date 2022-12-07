import * as React from "react";
import * as Style from "./notification.style";

interface NotificationProps {
  title: string;
  content: string;

  icon: React.ReactElement;
  onClick?: () => void;
  onRemove?: () => void;
}

export const Notification = React.memo((props: NotificationProps) => (
  <Style.Notification onClick={props.onClick}>
    <div className="icon">{props.icon}</div>
    <div className="title">{props.title}</div>
    <div className="content">{props.content}</div>
    <div
      className="remove"
      onClick={(event) => {
        event.stopPropagation();
        !!props.onRemove && props.onRemove();
      }}
    >
      지우기
    </div>
  </Style.Notification>
));
