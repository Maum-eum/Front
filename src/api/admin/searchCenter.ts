import { AxiosError, AxiosResponse } from 'axios';
import { noneApi } from '../../utils/http-commons';

import { ApiResponseDefault } from '../../types/commons';
import { SearchCenterData } from '../../types/admin/searchCenterData';


export const searchCenter = async (
  params: string,
  Response: (Response: AxiosResponse<ApiResponseDefault<SearchCenterData>>) => void,
  Error: (Error: AxiosError<ApiResponseDefault<null>>) => void
) => {
  await noneApi.get(`/center/search?centerName=${params}`,).then(Response).catch(Error);
};