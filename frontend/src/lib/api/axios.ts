import axios from 'axios';
import { env } from '@/config/env';
import { normalizeApiError } from './errors';
import { setupInterceptors } from './interceptors';

/**
 * Centrally configured Axios instance for all HTTP requests to our Express backend.
 * Dedicated strictly to core networking layers. Authentication interceptors will be attached later.
 */
export const apiInstance = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true, // Automatically sends browser cookies (e.g., refresh tokens) to backend
  timeout: 15000, // Terminate request if server hangs for more than 15 seconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Setup response structures and token refreshing
setupInterceptors(apiInstance);

// Response Interceptor: Translates failures into a unified AppApiError instance before passing down
apiInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Convert and throw the normalized error into TanStack Query / Consumers
    return Promise.reject(normalizeApiError(error));
  }
);
