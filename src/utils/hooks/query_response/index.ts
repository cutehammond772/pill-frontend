import { useLocation } from "react-router-dom";
import { Buffer } from "buffer";
import queryString from "query-string";

import { QueryResponseData, RawJsonData } from "./query_response.type";

// Base64 -> JSON -> Object
const useQueryResponse = () => {
    const { search } = useLocation();
    const { response } = queryString.parse(search);

    const get: QueryResponseData = <T>() => {
        if (!response) {
            return null as T;
        }

        const data = JSON.parse(Buffer.from(response as string, 'base64').toString('utf8'));
        return data as T;
    };

    const rawJsonString: RawJsonData = () => {
        if (!response) {
            return null;
        }

        return Buffer.from(response as string, 'base64').toString('utf8');
    };

    return { get, rawJsonString };
};

export { useQueryResponse };