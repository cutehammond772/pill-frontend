import React from "react";
import { Link } from "react-router-dom";

interface ProfileSpecProps {
    userName: string
};

// functional component는 기본적으로 ref가 제공되지 않으므로 forwardRef를 사용해야 한다.
const ProfileSpec = React.forwardRef<HTMLDivElement, ProfileSpecProps>(({ userName }, ref) => {
    return (
        <div className="pill-profile-spec" ref={ref}>
            <h3>Hello, {userName}!</h3>
            <Link to="/" className="btn w-100 btn-dark btn-lg text-white">Login</Link>
        </div>
    );
});

export default ProfileSpec;