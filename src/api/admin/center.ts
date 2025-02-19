import { AxiosError, AxiosResponse } from "axios";
import { privateApi } from "../../utils/http-commons";
import { ApiResponseDefault } from "../../types/commons/commons";

export const getCenterMatchingList = async (
  params: number,
  Response: (Response: AxiosResponse<ApiResponseDefault<null>>) => void,
  Error: (Error: AxiosError<ApiResponseDefault<null>>) => void
) => {
  await privateApi.get(`/match/${params}`).then(Response).catch(Error);
};
