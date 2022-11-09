import * as React from "react";
import { SerializedStyles } from "@emotion/serialize";

import * as Style from "./container.style";

interface ContainerProps extends React.PropsWithChildren {
    layout?: SerializedStyles;
}

const Container = (props: ContainerProps) => {
    return (
        <Style.Container layout={props.layout}>
            {props.children}
        </Style.Container>
    );
};

export { Container };