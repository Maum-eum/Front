import axios, { AxiosInstance } from "axios";
// import { httpStatusCode } from "./http-status";

const BASE_URL = "https://api.gyeotae.site";

export const noneApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
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
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export const formDataApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
  },
});

privateApi.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem("USER_STORE");
    if (stored) {
      const obj = JSON.parse(stored);
      if (obj.state.accessToken !== "") {
        config.headers["authorization"] = obj.state.accessToken;
        return config;
      }
    }
    const stored2 = localStorage.getItem("CAREGIVER_STORE");
    if (stored2) {
      const obj = JSON.parse(stored2);
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
    const stored = localStorage.getItem("USER_STORE");
    if (stored) {
      const obj = JSON.parse(stored);
      if (obj.state.accessToken !== "") {
        config.headers["authorization"] = obj.state.accessToken;
        return config;
      }
    }
    const stored2 = localStorage.getItem("CAREGIVER_STORE");
    if (stored2) {
      const obj = JSON.parse(stored2);
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
