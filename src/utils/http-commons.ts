import axios, { AxiosInstance } from "axios";
// import { httpStatusCode } from "./http-status";

const BASE_URL = "https://api.gyeotae.site";

export const noneApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export const publicApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const formDataApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

privateApi.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem("ADMIN_STORE");
    if (stored) {
      const obj = JSON.parse(stored);
      if (obj.state.accessToken !== "") {
        config.headers["authorization"] = obj.state.accessToken;
      }
    }
    return config;
  },
  async (error) => {
    return error;
  }
);

formDataApi.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem("ADMIN_STORE");
    if (stored) {
      const obj = JSON.parse(stored);
      if (obj.state.accessToken !== "") {
        config.headers["authorization"] = obj.state.accessToken;
      }
    }
    return config;
  },
  async (error) => {
    return error;
  }
);

//   formDataApi.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('accessToken');
//       if (token) {
//         config.headers['access'] = `${token}`;
//       }
//       return config;
//     },
//     async (error) => {
//       const { config, response: { status }, } = error;
//       // 토큰 만료일 경우.
//       if (status === 401) {
//         if (error.response.data.message === 'access token expired') {
//           const originRequest = config;

//           // 토큰 재발급.
//           await TokenRefresh(
//             (res) => {
//               // 성공 시
//               if (res.status === httpStatusCode.OK && res.headers.access) {
//                 localStorage.setItem('accessToken', res.headers.access);
//                 axios.defaults.headers.access = `${res.headers.access}`;
//                 originRequest.headers.access = `${res.headers.access}`;

//                 // 토큰 교환 후 재 시도.
//                 return axios(originRequest);
//               }
//             },
//             () => {
//               localStorage.clear();
//             }
//           )
//         }
//       }
//     }
//   );
