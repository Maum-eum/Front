export interface SignUpParams {
    username: string;
    password: string;
    name: string;
    connect: string;
    centerName: string;
    centerCertification: string;
};

export interface SignUpResponse {
    adminId: number;
    createAt: string;
}