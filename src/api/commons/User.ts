import { AxiosError, AxiosResponse } from 'axios';
import { noneApi } from '../../utils/http-commons';
import { LoginParams, LoginResponse, ApiResponseDefault } from '../../types/commons/commons';



export const Login = async (
  params: LoginParams,
  Response: (Response: AxiosResponse<ApiResponseDefault<LoginResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await noneApi.post(`/login`, params).then(Response).catch(Error);
};
