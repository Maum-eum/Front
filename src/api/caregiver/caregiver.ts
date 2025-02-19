import { AxiosError, AxiosResponse } from "axios";
import { formDataApi, privateApi } from "../../utils/http-commons";
import { CaregiverInfoResponse } from "../../types/caregiver/caregiverType";
import { ApiResponseDefault } from "../../types/commons/commons";

/* ✔️ 요양보호사 정보 조회 */
export const getCaregiverInfo = async (
  Response: (Response: AxiosResponse<ApiResponseDefault<CaregiverInfoResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi.get(`/caregiver/profile`).then(Response).catch(Error);
};

/* ✔️ 요양보호사 구직 상태 변경 */
export const changeStatus = async (
  Response: (Response: AxiosResponse<ApiResponseDefault<boolean>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await formDataApi.put(`/caregiver/status`).then(Response).catch(Error);
};
