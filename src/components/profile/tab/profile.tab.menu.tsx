import { Button, Link } from "@mui/joy";

import PropaneIcon from "@mui/icons-material/Propane";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import * as config from "../../../config";
import { AuthRequest } from "../../auth/auth.type";

const MyPillButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      size="md"
      variant="solid"
      color="primary"
      startDecorator={<PropaneIcon />}
      onClick={onClick}
    >
      My Pill
    </Button>
  );
};

const ManageProfileButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      size="md"
      variant="solid"
      color="info"
      startDecorator={<ManageAccountsIcon />}
    >
      Manage Profile
    </Button>
  );
};

const LoginButton = ({ request }: { request: AuthRequest }) => {
  return (
    <Button
      size="md"
      variant="solid"
      color="primary"
      startDecorator={<LoginIcon />}
    >
      <Link
        href={
          `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/${config.API_LOGIN_REQUEST}/` +
          `${request.provider}?redirect_uri=${request.redirect}`
        }
        underline="none"
        textColor="white"
        fontFamily="Inter"
      >
        Sign in with Google
      </Link>
    </Button>
  );
};

const LogoutButton = () => {
  return (
    <Button
      size="md"
      variant="solid"
      color="neutral"
      startDecorator={<LogoutIcon />}
    >
      <Link
        href={
          `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/` +
          `${config.API_LOGOUT_REQUEST}`
        }
        underline="none"
        textColor="white"
        fontFamily="Inter"
      >
        Logout
      </Link>
    </Button>
  );
};

export { MyPillButton, ManageProfileButton, LoginButton, LogoutButton };
