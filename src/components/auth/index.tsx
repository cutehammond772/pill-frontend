import * as React from "react";
import * as config from "../../config";

import { Link } from "@mui/joy";

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import * as Style from "./auth.style";

interface AuthButtonProps extends React.PropsWithChildren {
    redirect: string,
    provider?: string,

    size?: "lg" | "md" | "sm";
    color?: "primary" | "neutral" | "danger" | "info" | "success" | "warning";
};

const Login = (props: AuthButtonProps) => {
    return (
        <Style.AuthButton color={props.color || "primary"} size={props.size || "lg"} startDecorator={<LoginIcon />}>
            <Link href={
                `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/${config.API_LOGIN_REQUEST}/`+
                `${props.provider}?redirect_uri=${props.redirect}`} underline="none">
                {props.children || "Login"}
            </Link>
        </Style.AuthButton>
    );
};

const Logout = (props: AuthButtonProps) => {
    return (
        <Style.AuthButton color={props.color || "primary"} size={props.size || "lg"} startDecorator={<LogoutIcon />}>
            <Link href={
                `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/`+
                `${config.API_LOGOUT_REQUEST}`} underline="none">
                {props.children || "Logout"}
            </Link>
        </Style.AuthButton>
    );
};

export { Login, Logout, type AuthButtonProps };