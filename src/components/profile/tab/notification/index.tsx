import * as React from "react";
import * as Style from "./notification.style";

interface NotificationProps {
  title: string;
  content: string;

  icon: React.ReactElement;
  onClick?: () => void;
}

export const Notification = React.memo((props: NotificationProps) => (
  <Style.Notification>
    <div className="icon">{props.icon}</div>
    <div className="title">{props.title}</div>
    <div className="content">{props.content}</div>
    {/* onClose */}
  </Style.Notification>
));
