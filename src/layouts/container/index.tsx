import { PropsWithChildren } from "react";
import { ContainerStyle } from "./container.style";

const Container = (props: PropsWithChildren) => {
    return (
        <ContainerStyle>
            {props.children}
        </ContainerStyle>
    );
};

export { Container };