import { AxiosError, AxiosResponse } from 'axios';
import { noneApi } from '../../utils/http-commons';

import { SignUpParams, SignUpResponse } from '../../types/admin/singUpData';
import { ApiResponseDefault } from '../../types/commons';

export const signUp = async (
  params: SignUpParams,
  Response: (Response: AxiosResponse<ApiResponseDefault<SignUpResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await noneApi.post(`/admin/signup`, params).then(Response).catch(Error);
};
