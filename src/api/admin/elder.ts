import { AxiosError, AxiosResponse } from 'axios';
import { privateApi } from '../../utils/http-commons';
import { AddElderParams, AddElderResponse } from '../../types/admin/elderType';
import { ApiResponseDefault } from '../../types/commons';


export const addElder = async (
  params: AddElderParams,
  Response: (Response: AxiosResponse<ApiResponseDefault<AddElderResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.post(`/admin/${params.centerId}/elders`, params.data).then(Response).catch(Error);
};

// export const modifyElder = async (
//   params: AddElderParams,
//   Response: (Response: AxiosResponse<ApiResponseDefault<AddElderResponse>>) => void,
//   Error: (Error: AxiosError<null>) => void
// ) => {
//   await privateApi.post(`/admin/${params.centerId}/elders`, params.data).then(Response).catch(Error);
// };

// export const getElderList = async (
//   params: AddElderParams,
//   Response: (Response: AxiosResponse<ApiResponseDefault<AddElderResponse>>) => void,
//   Error: (Error: AxiosError<null>) => void
// ) => {
//   await privateApi.post(`/admin/${params.centerId}/elders`, params.data).then(Response).catch(Error);
// };

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
