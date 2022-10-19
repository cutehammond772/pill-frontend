import Logo from "./Logo";
import Profile from "./profile/Profile";

/*
props.title?: string
*/
const Header = ({ title }: { title?: string }) => {
    return (
        <div className="pill-header">
            {!!title ? (
                // Header Title이 존재하면 title 표시
                <h1>{title}</h1>
            ) : 
            (
                // Header Title이 존재하지 않으면 Logo 표시
                <Logo />
            )}
            <Profile />
        </div>
    );
}

export default Header;