import * as React from "react";

interface AuthRequest {
    redirect: string,
    provider?: string,
    children?: React.ReactNode
};

interface AuthNode {
     (request: AuthRequest): React.ReactElement
};

export type { AuthRequest, AuthNode };