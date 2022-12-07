import * as React from "react";
import * as Style from "./menu.style";
import * as config from "../../../../../config";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { I18N, I18nProps } from "../../../../../utils/i18n";
import { usePageNavigate } from "../../../../../utils/hooks/page-navigate";

export const UserMenu = React.memo((props: I18nProps) => (
  <Style.Menu>
    <ManageMenuButton {...props} />
    <LogoutMenuButton {...props} />
  </Style.Menu>
));

export const GuestMenu = React.memo((props: I18nProps) => (
  <Style.Menu>
    <LoginMenuButton {...props} />
  </Style.Menu>
));

const LoginMenuButton = React.memo((props: I18nProps) => (
  <Style.MenuButton>
    <LoginIcon />
    <a
      href={`http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/${config.API_LOGIN_REQUEST}/google?redirect_uri=${config.INDEX}`}
    >
      {props.text(I18N.TAB_04)}
    </a>
  </Style.MenuButton>
));

const ManageMenuButton = (props: I18nProps) => {
  const { navigate } = usePageNavigate();
  return <MemoizedManageMenuButton navigate={ navigate } {...props} />;
};

const LogoutMenuButton = React.memo((props: I18nProps) => (
  <Style.MenuButton>
    <LogoutIcon />
    <a
      href={`http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/${config.API_LOGOUT_REQUEST}`}
    >
      {props.text(I18N.TAB_06)}
    </a>
  </Style.MenuButton>
));

const MemoizedManageMenuButton = React.memo(
  (props: I18nProps & { navigate: (to: string) => void }) => (
    <Style.MenuButton>
      <ManageAccountsIcon />
      <div onClick={() => props.navigate("/manage")}>
        {props.text(I18N.TAB_05)}
      </div>
    </Style.MenuButton>
  )
);
