import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="pill-footer">
            <p className="mb-0 text-white">&copy; 2022 Jungheon Lee</p>

            <ul className="nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link px-2 text-white">Help</Link>
                </li>
            </ul>
        </div>
    );  
};

export default Footer;