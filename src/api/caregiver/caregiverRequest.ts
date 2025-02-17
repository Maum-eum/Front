import { AxiosError, AxiosResponse } from "axios";
import { privateApi } from "../../utils/http-commons";
import {
  MatchedListResponse,
  RecruitRequest,
  RequestsListResponse,
} from "../../types/caregiver/caregiverRequestType";

type ApiResponseDefault<T> = {
  data: T;
  status: number;
  message: string;
};

/* 요양보호사 근무 요청 응답 */
export const reponseToRecruit = async (
  params: RecruitRequest,
  Response: (Response: AxiosResponse<ApiResponseDefault<string>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.put(`/match/response/`, params).then(Response).catch(Error);
};

/* 요양보호사 매칭 현황 리스트 조회 */
export const getMatchedResquests = async (
  Response: (Response: AxiosResponse<ApiResponseDefault<MatchedListResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.get(`/caregiver/status/`).then(Response).catch(Error);
};

/* 요양보호사 근무 요청 리스트 조회 */
export const getRequests = async (
  Response: (Response: AxiosResponse<ApiResponseDefault<RequestsListResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.get(`/match/requests/`).then(Response).catch(Error);
};
