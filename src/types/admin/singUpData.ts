export interface SignUpParams {
    username: string;
    password: string;
    name: string;
    connect: string;
    centerName: string;
};

export interface SignUpResponseData {
    data: Record<string, string> | null;
    status: number;
    message: string;
};