import { SerializedStyles } from "@emotion/serialize";

interface ContainerProps {
    title: string;
    complete: boolean;
    layout: SerializedStyles;
}

export type { ContainerProps };