export interface ApiResponseDefault<T> {
  data: T;
  status: number;
  message: string;
};

export interface LoginParams {
  username: string;
  password: string;
}

interface BaseLoginResponse {
  userId: number;
  role: "ROLE_ADMIN" | "ROLE_CAREGIVER";
}

interface AdminLoginResponse extends BaseLoginResponse {
  role: "ROLE_ADMIN";
  name: string;
  centerId: number;
  centerName: string;
}

interface CaregiverLoginResponse extends BaseLoginResponse {
  role: "ROLE_CAREGIVER";
}

export type LoginResponse = AdminLoginResponse | CaregiverLoginResponse;