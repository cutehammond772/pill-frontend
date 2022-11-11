import * as config from "../../config";
import { AuthRequest, AuthNode } from "./auth.type";

import { Link } from "@mui/joy";

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import * as Style from "./auth.style";

const Login: AuthNode = (request: AuthRequest) => {
    return (
        <Style.AuthButton color="primary" size="lg" startDecorator={<LoginIcon />}>
            <Link href={
                `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/${config.API_LOGIN_REQUEST}/`+
                `${request.provider}?redirect_uri=${request.redirect}`} underline="none">
                {request.children}
            </Link>
        </Style.AuthButton>
    );
};

const Logout: AuthNode = (request: AuthRequest) => {
    return (
        <Style.AuthButton color="primary" size="lg" startDecorator={<LogoutIcon />}>
            <Link href={
                `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/`+
                `${config.API_LOGOUT_REQUEST}`} underline="none">
                {request.children}
            </Link>
        </Style.AuthButton>
    );
};

export { Login, Logout };