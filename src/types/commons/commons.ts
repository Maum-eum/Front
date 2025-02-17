export interface ApiResponseDefault<T> {
  data: T;
  status: number;
  message: string;
};

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  role:   string;
}