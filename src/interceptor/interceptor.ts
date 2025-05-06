import { AppURl, showToast } from "@/utils/utils";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: `${AppURl}/api/v1`,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token") as string);
      if (token && config.headers) {
        config.headers.Authorization = token ? `${token}` : "";
      }
    } catch (error) {
      console.error("Error retrieving token from localStorage", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    const method = response?.config?.method?.toUpperCase(); // Get HTTP method
    if (
      method === "POST" ||
      method === "DELETE" ||
      method === "PUT" ||
      method === "PATCH"
    ) {
      showToast(response?.data?.message, "Success");
    }

    return response;
  },
  (error) => {
    showToast(error?.response?.data?.message, "Err");
    return Promise.reject(error);
  }
);

export default axiosInstance;
