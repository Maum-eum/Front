import { AxiosError, AxiosResponse } from 'axios';
import { noneApi } from '../../utils/http-commons';

import { SignUpParams, SignUpResponseData } from '../../types/admin/singUpData';

// export const TokenRefresh = async(
//     Response : (Response : AxiosResponse<>) => void, 
//     Error : (Error : AxiosResponse<>) => void) => {
//     await noneApi.post(`/${url}/reissue`,{withCredentials: true})
//     .then(Response)
//     .catch(Error)
//   }

export const signUp = async (
  params: SignUpParams,
  Response: (Response: AxiosResponse<SignUpResponseData>) => void,
  Error: (Error: AxiosError<SignUpResponseData>) => void
) => {
  await noneApi.post(`/admin/signup`, params).then(Response).catch(Error);
};
