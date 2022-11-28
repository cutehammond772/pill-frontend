import * as React from "react";
import * as config from "../../config";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import * as Style from "./auth.style";
import { useLocalization } from "../../utils/hooks/l10n";
import { L10N } from "../../localization";
import { ColorAttributes } from "../../GlobalStyles";

interface AuthButtonProps extends React.PropsWithChildren {
  redirect: string;
  provider?: string;
}

const Login = (props: AuthButtonProps) => {
  const { text } = useLocalization();

  return (
    <Style.AuthButton bgColor={ColorAttributes.PRIMARY} textColor={ColorAttributes.LIGHT}>
      <a
        href={
          `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/${config.API_LOGIN_REQUEST}/` +
          `${props.provider}?redirect_uri=${props.redirect}`
        }
        className="link"
      >
        <LoginIcon />
        {props.children || text(L10N.AUTH_01)}
      </a>
    </Style.AuthButton>
  );
};

const Logout = (props: AuthButtonProps) => {
  const { text } = useLocalization();

  return (
    <Style.AuthButton bgColor="var(--blue)" textColor="var(--light)">
      <LogoutIcon />
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
