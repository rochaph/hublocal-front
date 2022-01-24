import Axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const createClient = (params?: Omit<AxiosRequestConfig, "baseURL">) =>
  Axios.create({
    ...params,
    baseURL: process.env.API_URL,
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });
