import { AxiosResponse } from "axios";
import { privateApi } from "../../utils/http-commons";
import { CaregiverInfoResponse } from "../../types/caregiver/caregiverType";
import { ApiResponseDefault } from "../../types/commons/commons";

/* ✔️ 요양보호사 정보 조회 */
export const getCaregiverInfo = async (): Promise<CaregiverInfoResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseDefault<CaregiverInfoResponse | null>> =
      await privateApi.get(`/caregiver/profile`);
    return response.data.data;
  } catch (error) {
    console.error("Error getCaregiverInfo", error);
    return null;
  }
};

/* ✔️ 요양보호사 구직 상태 변경 */
export const changeStatus = async (): Promise<boolean | null> => {
  try {
    const response: AxiosResponse<ApiResponseDefault<boolean | null>> =
      await privateApi.put(`/caregiver/status`);
    return response.data.data;
  } catch (error) {
    console.error("Error changeStatus", error);
    return null;
  }
};
