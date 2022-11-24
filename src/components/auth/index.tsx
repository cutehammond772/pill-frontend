import * as React from "react";
import * as config from "../../config";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import * as Style from "./auth.style";
import { useLocalization } from "../../utils/hooks/localization";
import { L10N } from "../../localization";

interface AuthButtonProps extends React.PropsWithChildren {
  redirect: string;
  provider?: string;

  size?: "lg" | "md" | "sm";
  color?: "primary" | "neutral" | "danger" | "info" | "success" | "warning";
}

const Login = (props: AuthButtonProps) => {
  const { text } = useLocalization();

  return (
    <Style.AuthButton
      color={props.color || "primary"}
      size={props.size || "lg"}
      startDecorator={<LoginIcon />}
    >
      <a
        href={
          `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/${config.API_LOGIN_REQUEST}/` +
          `${props.provider}?redirect_uri=${props.redirect}`
        }
        className="link"
      >
        {props.children || text(L10N.AUTH_01)}
      </a>
    </Style.AuthButton>
  );
};

const Logout = (props: AuthButtonProps) => {
  const { text } = useLocalization();

  return (
    <Style.AuthButton
      color={props.color || "primary"}
      size={props.size || "lg"}
      startDecorator={<LogoutIcon />}
    >
      <a
        href={
          `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/` +
          `${config.API_LOGOUT_REQUEST}`
        }
        className="link"
      >
        {props.children || text(L10N.AUTH_01)}
      </a>
    </Style.AuthButton>
  );
};

export { Login, Logout, type AuthButtonProps };
