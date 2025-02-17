import { AxiosError, AxiosResponse } from 'axios';
import { privateApi, formDataApi } from '../../utils/http-commons';
import { AddElderResponse, AddElderParams, AddElderServiceParams, elderInfo } from '../../types/admin/elderType';
import { ApiResponseDefault } from '../../types/commons';


export const addElder = async (
  params: AddElderParams,
  Response: (Response: AxiosResponse<ApiResponseDefault<AddElderResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await formDataApi.post(`/admin/${params.centerId}/elders`, params.data).then(Response).catch(Error);
};

export const addElderService = async (
  params: AddElderServiceParams,
  Response: (Response: AxiosResponse<ApiResponseDefault<AddElderResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.post(`/admin/${params.centerId}/care/${params.elderId}`, params.data).then(Response).catch(Error);
};

// export const modifyElder = async (
//   params: AddElderParams,
//   Response: (Response: AxiosResponse<ApiResponseDefault<AddElderResponse>>) => void,
//   Error: (Error: AxiosError<null>) => void
// ) => {
//   await privateApi.post(`/admin/${params.centerId}/elders`, params.data).then(Response).catch(Error);
// };

export const getElderList = async (
  params: number,
  Response: (Response: AxiosResponse<ApiResponseDefault<elderInfo[]>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.get(`/admin/${params}/elders`).then(Response).catch(Error);
};

// export const getElderDetail = async (
//   params: AddElderParams,
//   Response: (Response: AxiosResponse<ApiResponseDefault<AddElderResponse>>) => void,
//   Error: (Error: AxiosError<null>) => void
// ) => {
//   await privateApi.post(`/admin/${params.centerId}/elders`, params.data).then(Response).catch(Error);
// };

// export const DeleteElder = async (
//   params: AddElderParams,
//   Response: (Response: AxiosResponse<ApiResponseDefault<AddElderResponse>>) => void,
//   Error: (Error: AxiosError<null>) => void
// ) => {
//   await privateApi.post(`/admin/${params.centerId}/elders`, params.data).then(Response).catch(Error);
// };
