import { Link } from "react-router-dom";
import { ReactComponent as LogoImage } from '../assets/logo.svg';

const Logo = () => {
    return (
        <Link to="/">
            <LogoImage />
        </Link>
    );
}

export default Logo;