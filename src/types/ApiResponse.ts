export interface ApiResponseDefault<T> {
    data: T;
    status: number;
    message: string;
};