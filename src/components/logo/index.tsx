import { Link } from "react-router-dom";
import { ReactComponent as LogoImage } from '../../assets/logo.svg';

const Logo = ({url = "/"} : {url?: string}) => {
    return (
        <Link to={url}>
            <LogoImage />
        </Link>
    );
}

export { Logo };