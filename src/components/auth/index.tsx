import * as React from "react";
import * as config from "../../config";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import * as Style from "./auth.style";
import { useI18n } from "../../utils/hooks/i18n";
import { I18N } from "../../utils/i18n";
import { ColorAttributes } from "../../GlobalStyles";

export interface AuthButtonProps extends React.PropsWithChildren {
  redirect: string;
  provider?: string;
}

export const Login = (props: AuthButtonProps) => {
  const { text } = useI18n();
  const link = `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/${config.API_LOGIN_REQUEST}/
          ${props.provider}?redirect_uri=${props.redirect}`;

  return (
    <MemoizedLogin
      link={link}
      children={props.children || text(I18N.AUTH_01)}
    />
  );
};

export const Logout = (props: AuthButtonProps) => {
  const { text } = useI18n();
  const link = `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/
  ${config.API_LOGOUT_REQUEST}`;

  return (
    <MemoizedLogout
      link={link}
      children={props.children || text(I18N.AUTH_02)}
    />
    );
};

const MemoizedLogin = React.memo(
  (props: { link: string; children: React.ReactNode }) => (
    <Style.AuthButton
      bgColor={ColorAttributes.PRIMARY}
      textColor={ColorAttributes.LIGHT}
    >
      <a href={props.link} className="link">
        <LoginIcon />
        {props.children}
      </a>
    </Style.AuthButton>
  )
);

const MemoizedLogout = React.memo(
  (props: { link: string; children: React.ReactNode }) => (
    <Style.AuthButton
      bgColor={ColorAttributes.BLUE}
      textColor={ColorAttributes.LIGHT}
    >
      <a href={props.link} className="link">
        <LogoutIcon />
        {props.children}
      </a>
    </Style.AuthButton>
  )
);
