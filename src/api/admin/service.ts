import { AxiosResponse, AxiosError } from 'axios';
import { privateApi } from '../../utils/http-commons';
import { ApiResponseDefault } from '../../types/commons/commons';
import { MatchInfo } from '../../types/admin/elderType';

import { AddElderServiceParams, elderService,  RecommendedList } from '../../types/admin/elderType';

// 구인 조건 등록
export const addElderService = async (
  params: AddElderServiceParams,
  Response: (Response: AxiosResponse<ApiResponseDefault<elderService>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.post(`/admin/${params.centerId}/recruit/${params.elderId}`, params.data).then(Response).catch(Error);
};

// 구인 조건 조회
export const getRecruitList = async (
  params: {
    centerId: number;
    elderId: number;
  },
  Response: (Response: AxiosResponse<ApiResponseDefault<elderService[]>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.get(`/admin/${params.centerId}/recruit/${params.elderId}`).then(Response).catch(Error);
};

// 조건에 따른 요양보호사 리스트 조회
export const getCaregiverList = async (
  params: {
    recruitId: number;
  },
  Response: (Response: AxiosResponse<ApiResponseDefault<RecommendedList>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.get(`/match/recommends/${params.recruitId}`).then(Response).catch(Error);
};

// 요청 전 각 조건 상세정보 조회 API
export const getPrevMatchInfo = async (
  params: {
    jobId: number,
    recruitId: number;
  },
  Response: (Response: AxiosResponse<ApiResponseDefault<MatchInfo[]>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.get(`/match/recommends/${params.jobId}/${params.recruitId}`).then(Response).catch(Error);
};

// 요청 생성
export const createMatch = async (
  params: {
    jobId: number,
    recruitId: number;
  },
  Response: (Response: AxiosResponse<ApiResponseDefault<null>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.post(`/match/recommends/${params.jobId}/${params.recruitId}`).then(Response).catch(Error);
};




export const getMatchingList = async (
  params: number,
  Response: (Response: AxiosResponse<ApiResponseDefault<MatchInfo[]>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.get(`/match/${params}`).then(Response).catch(Error);
};