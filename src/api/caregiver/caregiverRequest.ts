import { AxiosError, AxiosResponse } from "axios";
import { privateApi } from "../../utils/http-commons";

/* 요양보호사 정보 */
export const addElder = async (
  params: AddElderParams,
  Response: (Response: AxiosResponse<ApiResponseDefault<AddElderResponse>>) => void,
  Error: (Error: AxiosError<null>) => void
) => {
  await privateApi
    .post(`/admin/${params.centerId}/elders`, params.data)
    .then(Response)
    .catch(Error);
};
