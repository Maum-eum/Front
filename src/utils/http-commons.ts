import axios, { AxiosInstance } from "axios";
// import { httpStatusCode } from "./http-status";

const BASE_URL = "https://api.gyeotae.site";

export const noneApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
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
