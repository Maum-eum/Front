import { AxiosError, AxiosResponse } from "axios";
import { privateApi } from "../../utils/http-commons";
import { CaregiverInfoResponse } from "../../types/caregiver/caregiverType";

type ApiResponseDefault<T> = {
  data: T;
  status: number;
  message: string;
};

/* 요양보호사 정보 조회 */
export const getCaregiver = async (
  Response: (Response: AxiosResponse<ApiResponseDefault<CaregiverInfoResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.get(`/caregiver/profile/`).then(Response).catch(Error);
};

/* 요양보호사 구직 상태 변경 */
export const changeStatus = async (
  Response: (Response: AxiosResponse<ApiResponseDefault<boolean>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.post(`/caregiver/status/`).then(Response).catch(Error);
};
