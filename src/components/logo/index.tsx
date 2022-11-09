import { Link } from "react-router-dom";
import { LogoStyle } from "./logo.style";

interface LogoProps {
    url?: string;
}

const Logo = (props: LogoProps) => {
    return (
        <Link to={props.url || "/"}>
            <LogoStyle />
        </Link>
    );
}

export { Logo };