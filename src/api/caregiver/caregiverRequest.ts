import { AxiosResponse } from "axios";
import { privateApi } from "../../utils/http-commons";
import {
  MatchedListResponse,
  RecruitRequest,
  RequestsListResponse,
} from "../../types/caregiver/caregiverRequestType";
import { ApiResponseDefault } from "../../types/commons/commons";
import { elderInfo } from "../../types/admin/elderType";
import type { Response } from "../../types/admin/recruitData";

/* 요양보호사 근무 요청 응답 */
export const reponseToRecruit = async (params: RecruitRequest): Promise<boolean | null> => {
  try {
    const response: AxiosResponse<ApiResponseDefault<boolean | null>> = await privateApi.put(
      `/match/response`,
      params
    );
    return response.data.data;
  } catch (error) {
    console.error("Error reponseToRecruit", error);
    return null;
  }
};

/* 요양보호사 일정 리스트 조회 */
export const getMatches = async (): Promise<MatchedListResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseDefault<MatchedListResponse>> =
      await privateApi.get(`/match/matching`);
    return response.data.data;
  } catch (error) {
    console.error("Error getMatches", error);
    return null;
  }
};

/* 요양보호사 근무 요청 리스트 조회 */
export const getRequests = async (): Promise<RequestsListResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseDefault<RequestsListResponse>> =
      await privateApi.get(`/match/requests`);
    return response.data.data;
  } catch (error) {
    console.error("Error getRequests", error);
    return null;
  }
};

/* 요양보호사 근무 요청 상세 정보 조회 */
export const getRequestDetails = async (
  centerId: number,
  elderId: number,
  recruitId: number
): Promise<Response | null> => {
  try {
    const response: AxiosResponse<ApiResponseDefault<Response | null>> = await privateApi.get(
      `/admin/${centerId}/recruit/${elderId}/${recruitId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error getRequestDetails", error);
    return null;
  }
};

export const getElderDetails = async (
  centerId: number,
  elderId: number
): Promise<elderInfo | null> => {
  try {
    const response: AxiosResponse<ApiResponseDefault<elderInfo | null>> = await privateApi.get(
      `/admin/${centerId}/elders/${elderId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error getElderDetails", error);
    return null;
  }
};
