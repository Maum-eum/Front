import { AxiosError, AxiosResponse } from 'axios';
import { noneApi } from '../../utils/http-commons';

import { SignUpParams, SignUpResponse } from '../../types/admin/singUpType';
import { ApiResponseDefault } from '../../types/commons';
import { SearchCenterData } from '../../types/admin/searchCenterData';

export const signUp = async (
  params: SignUpParams,
  Response: (Response: AxiosResponse<ApiResponseDefault<SignUpResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await noneApi.post(`/admin/signup`, params).then(Response).catch(Error);
};

export const searchCenter = async (
  params: string,
  Response: (Response: AxiosResponse<ApiResponseDefault<SearchCenterData>>) => void,
  Error: (Error: AxiosError<ApiResponseDefault<null>>) => void
) => {
  await noneApi.get(`/center/search?centerName=${params}`,).then(Response).catch(Error);
};