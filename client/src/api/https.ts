import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      Promise.reject(err);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      Promise.reject(err);
    }
  );
  return axiosInstance;
};

export const api = createClient();
