interface DataRequest {
    <T>(url: string): Promise<T>
};

export type { DataRequest };