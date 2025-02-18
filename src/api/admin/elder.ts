import { AxiosError, AxiosResponse } from 'axios';
import { privateApi, formDataApi } from '../../utils/http-commons';
import { AddElderResponse, AddElderParams, elderInfo } from '../../types/admin/elderType';
import { ApiResponseDefault } from '../../types/commons';

// 센터 내 어르신 조회
export const getElderList = async (
  params: number,
  Response: (Response: AxiosResponse<ApiResponseDefault<elderInfo[]>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.get(`/admin/${params}/elders`).then(Response).catch(Error);
};

// 센터 내 어르신 상세 조회
export const getElderDetail = async (
  params: {
    centerId: number,
    elderId: number
  },
  Response: (Response: AxiosResponse<ApiResponseDefault<elderInfo>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.get(`/admin/${params.centerId}/elders/${params.elderId}`).then(Response).catch(Error);
};

// 어르신 등록
export const addElder = async (
  params: AddElderParams,
  Response: (Response: AxiosResponse<ApiResponseDefault<AddElderResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await formDataApi.post(`/admin/${params.centerId}/elders`, params.data).then(Response).catch(Error);
};

// 어르신 수정
export const modifyElder = async (
  params: AddElderParams,
  Response: (Response: AxiosResponse<ApiResponseDefault<AddElderResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await formDataApi.put(`/admin/${params.centerId}/elders`, params.data).then(Response).catch(Error);
};

// 어르신 삭제
export const deleteElder = async (
  params: {
    centerId:number,
    elderId:number
  },
  Response: (Response: AxiosResponse<ApiResponseDefault<AddElderResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.delete(`/admin/${params.centerId}/elders/${params.elderId}`).then(Response).catch(Error);
};

// 어르신 임시 저장
export const addTempElder = async (
  params: AddElderParams,
  Response: (Response: AxiosResponse<ApiResponseDefault<AddElderResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await formDataApi.post(`/admin/${params.centerId}/elders/temp`, params.data).then(Response).catch(Error);
};

// 임시 저장된 어르신 상세 조회
export const getTempElderDetail = async (
  params: {
    centerId:number,
    elderId:number
  },
  Response: (Response: AxiosResponse<ApiResponseDefault<elderInfo[]>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.get(`/admin/${params.centerId}/elders/temp/${params.elderId}`).then(Response).catch(Error);
};

// 임시 저장된 어르신조회
export const getTempElderList = async (
  params: number,
  Response: (Response: AxiosResponse<ApiResponseDefault<elderInfo[]>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.get(`/admin/${params}/elders/temp`).then(Response).catch(Error);
};


