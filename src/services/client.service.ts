import Axios, { AxiosRequestConfig } from "axios";

export const createClient = (params?: Omit<AxiosRequestConfig, "baseURL">) =>
  Axios.create({
    ...params,
    baseURL: process.env.API_URL,
  });
