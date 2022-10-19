import * as React from "react";
import { ReactElement } from "react";
import * as config from "../../config";
import { Button } from "@mui/material";

const LOGIN_REQUEST: string = 'auth/login';
const LOGOUT_REQUEST: string = 'auth/logout';

interface AuthRequest {
    redirect: string,
    className: string,
    provider?: string,
    children?: React.ReactNode
};

interface AuthNode {
     (request: AuthRequest): ReactElement
};

const Login: AuthNode = (request: AuthRequest) => {
    return (
        <Button variant="contained">
            <a href={
                `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/${LOGIN_REQUEST}/`+
                `${request.provider}?redirect_uri=${request.redirect}`}>
                {request.children}
            </a>
        </Button>
    );
};

const Logout: AuthNode = (request: AuthRequest) => {
    return (
        <Button variant="contained">
            <a href={
                `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/`+
                `${LOGOUT_REQUEST}`}>
                {request.children}
            </a>
        </Button>
    );
};

export { Login, Logout };