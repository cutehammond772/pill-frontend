import { useLocation } from "react-router-dom";
import { Buffer } from "buffer";
import queryString from "query-string";

// Base64 to JSON
const Response = () => {
    const { search } = useLocation();
    const { response } = queryString.parse(search);

    if (!response) {
        return null;
    }
    
    return Buffer.from(response as string, 'base64').toString('utf8');
};

export default Response;