import { PropsWithChildren } from "react";
import { ContainerStyle } from "./container.style";

const Container = ({ children }: PropsWithChildren) => {
    return (
        <ContainerStyle>
            {children}
        </ContainerStyle>
    );
};

export { Container };