import { AxiosError, AxiosResponse } from "axios";
import { formDataApi, privateApi } from "../../utils/http-commons";
import {
  MatchedListResponse,
  RecruitRequest,
  RequestsListResponse,
} from "../../types/caregiver/caregiverRequestType";
import { ApiResponseDefault } from "../../types/commons";

/* 요양보호사 근무 요청 응답 */
export const reponseToRecruit = async (
  params: RecruitRequest,
  Response: (Response: AxiosResponse<ApiResponseDefault<RecruitRequest>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.put(`/match/response`, params).then(Response).catch(Error);
};

/* 요양보호사 일정 리스트 조회 */
export const getMatches = async (
  Response: (Response: AxiosResponse<ApiResponseDefault<MatchedListResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.get(`/match/matching`).then(Response).catch(Error);
};

/* 요양보호사 근무 요청 리스트 조회 */
export const getRequests = async (
  Response: (Response: AxiosResponse<ApiResponseDefault<RequestsListResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.get(`/match/requests`).then(Response).catch(Error);
};

/* 요양보호사 근무 요청 상세 정보 조회 */
export const getRequestDetails = async (
  Response: (Response: AxiosResponse<ApiResponseDefault<RequestsListResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.get(`/match/requests/detail`).then(Response).catch(Error);
};
