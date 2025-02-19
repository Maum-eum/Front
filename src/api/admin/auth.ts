import { AxiosError, AxiosResponse } from "axios";
import { noneApi, privateApi } from "../../utils/http-commons";

<<<<<<< HEAD
import { SignUpParams, SignUpResponse } from "../../types/admin/singUpType";
import { SearchCenterData } from "../../types/admin/searchCenterData";
import { ApiResponseDefault } from "../../types/commons/commons";
=======
import { SignUpParams, SignUpResponse } from '../../types/admin/singUpType';
import { ApiResponseDefault } from '../../types/commons/commons';
import { SearchCenterData } from '../../types/admin/searchCenterData';
>>>>>>> 17bdeebeffee690b7835a8f0ed4eef710c989458

export const signUp = async (
  params: SignUpParams,
  Response: (Response: AxiosResponse<ApiResponseDefault<SignUpResponse>>) => void,
  Error: (Error: AxiosError<ApiResponseDefault<null>>) => void
) => {
  await noneApi.post(`/admin/signup`, params).then(Response).catch(Error);
};

export const searchCenter = async (
  params: string,
  Response: (Response: AxiosResponse<ApiResponseDefault<SearchCenterData[]>>) => void,
  Error: (Error: AxiosError<ApiResponseDefault<null>>) => void
) => {
  await noneApi.get(`/center/search?keyword=${params}`).then(Response).catch(Error);
};

export const getAdminDetail = async (
  Response: (Response: AxiosResponse<ApiResponseDefault<SignUpParams>>) => void,
  Error: (Error: AxiosError<ApiResponseDefault<null>>) => void
) => {
  await privateApi.get("/admin/profile").then(Response).catch(Error);
};

export const modifyAdmin = async (
  params: {
    name: string;
    connect: string;
  },
  Response: (Response: AxiosResponse<ApiResponseDefault<SignUpParams>>) => void,
  Error: (Error: AxiosError<ApiResponseDefault<null>>) => void
) => {
  await privateApi.put("/admin/profile", params).then(Response).catch(Error);
};

export const deleteAdmin = async (
  Response: (Response: AxiosResponse<ApiResponseDefault<Record<string, boolean>>>) => void,
  Error: (Error: AxiosError<ApiResponseDefault<null>>) => void
) => {
  await privateApi.delete("/admin/").then(Response).catch(Error);
};
