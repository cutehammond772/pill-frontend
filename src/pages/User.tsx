import { useParams } from "react-router-dom";

const User = () => {
    const params = useParams();
    const profile = params.userid;

    return (
        <div>
            <h1>UserId</h1>
            {profile ?
            // userid exists
            (
                <p>Welcome, {profile}</p>
            ) : 
            // userid does not exist
            (
                <p>This userid does not exist.</p>
            )}
        </div>
    );
};

export default User;