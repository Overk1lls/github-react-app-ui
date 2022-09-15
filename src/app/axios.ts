import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { getAccessToken, refreshAccessToken } from './auth';
import { ServerErrorCode } from './errors';

export interface AxiosClient {
  protectedClient: AxiosInstance;
  publicClient: AxiosInstance;
}

export function createAxiosClient(baseUrl: string): AxiosClient {
  const requestConfig: AxiosRequestConfig = {
    baseURL: baseUrl,
  };
  const protectedClient = axios.create(requestConfig);
  const publicClient = axios.create(requestConfig);

  protectedClient.interceptors.request.use((req) => {
    if (!req.headers) {
      req.headers = {};
    }
    req.headers.Authorization = 'Bearer ' + getAccessToken();
    return req;
  });

  protectedClient.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (isExpiredTokenResponse(error)) {
        await refreshAccessToken(publicClient);
        return protectedClient.request(error.config);
      }
      throw error;
    }
  );

  return {
    protectedClient,
    publicClient,
  };
}

export function isExpiredTokenResponse(error: unknown): error is AxiosError {
  return (
    error instanceof AxiosError &&
    error.response?.status === 403 &&
    error.response.data.code === ServerErrorCode.AuthExpired
  );
}
