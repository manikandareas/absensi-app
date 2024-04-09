// import axios, { AxiosInstance, AxiosPromise } from "axios";

import { authHeadersFactory } from "@/action/authHeadersFactory";
import Axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

// const BASE_URL = `${process.env.BACKEND_URL}/api`;
export class AxiosManager {
  public readonly axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create();
    this.axios.interceptors.request.use(this.authRequestInterceptor);
  }

  private async authRequestInterceptor(
    axiosConfig: InternalAxiosRequestConfig,
  ) {
    // const token = useAuthStore.getState().backendTokens?.accessToken;
    const session = await authHeadersFactory();
    if (axiosConfig.headers) {
      if (session?.backendTokens.accessToken) {
        axiosConfig.headers.Authorization = `Bearer ${session.backendTokens.accessToken}`;
      }
      axiosConfig.headers.Accept = "application/json";
    }

    return axiosConfig;
  }
}

// will be used in SSR API Requests
export const { axios } = new AxiosManager();
