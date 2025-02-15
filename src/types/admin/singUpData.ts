export interface SignUpParams {
    username: string;
    password: string;
    name: string;
    connect: string;
    centerName: string;
};

export interface SignUpResponse {
    adminId: number;
    createAt: string;
}