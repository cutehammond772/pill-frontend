interface QueryResponseData {
    <T>(): T
}

interface RawJsonData {
    (): string | null
};

export type { QueryResponseData, RawJsonData };