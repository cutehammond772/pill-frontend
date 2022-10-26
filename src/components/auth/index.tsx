import * as config from "../../config";
import { AuthRequest, AuthNode } from "./auth.type";

import { Button, Link } from "@mui/joy";

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { DefaultText } from "../../styles/GlobalStyles";

const Login: AuthNode = (request: AuthRequest) => {
    return (
        <Button color="primary" size="lg" startDecorator={<LoginIcon />}>
            <Link href={
                `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/${config.API_LOGIN_REQUEST}/`+
                `${request.provider}?redirect_uri=${request.redirect}`} underline="none">
                <DefaultText>{request.children}</DefaultText>
            </Link>
        </Button>
    );
};

const Logout: AuthNode = (request: AuthRequest) => {
    return (
        <Button color="primary" size="lg" startDecorator={<LogoutIcon />}>
            <Link href={
                `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/`+
                `${config.API_LOGOUT_REQUEST}`} underline="none">
                <DefaultText>{request.children}</DefaultText>
            </Link>
        </Button>
    );
};

export { Login, Logout };