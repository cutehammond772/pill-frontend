import { PropsWithChildren } from "react";
import { ContainerContent } from "./container.style";

const Container = ({ children }: PropsWithChildren) => {
    return (
        <ContainerContent>
            {children}
        </ContainerContent>
    );
};

export { Container };