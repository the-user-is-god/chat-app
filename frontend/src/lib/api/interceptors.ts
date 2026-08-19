import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { authApi } from '@/features/auth/api/auth.api';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null);
    }
  });
  failedQueue = [];
};

export function setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      // 1. Immediately drop out if not a 401 validation issue
      if (!error.response || error.response.status !== 401) {
        return Promise.reject(error);
      }

      // 2. Prevent infinite loops if the refresh call itself is what threw the 401
      if (originalRequest.url?.includes('/auth/refresh')) {
        return Promise.reject(error);
      }

      // 3. Stop if this specific request has already attempted a retry cycle
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      // 4. SYNCHRONOUS CHECK: Queue immediately if a refresh is flying
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      // Lock execution immediately before hitting any async await calls
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Force the refresh call using your API abstraction layer
        await authApi.refresh();

        // Resolve all waiting requests in the queue
        processQueue(null);

        // Retry the original request that initiated the refresh
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );

  return axiosInstance;
}
