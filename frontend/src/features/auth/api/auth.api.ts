import { api, ApiResponse } from '@/lib/api';
import type {
  User,
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ResendVerificationInput,
  UpdateProfileInput,
} from '../types/auth.types';

/**
 * Pure API implementation matching your backend v1 endpoints.
 * Relies on global axios config withCredentials for cookie management.
 */
export const authApi = {
  register: async (data: RegisterInput): Promise<ApiResponse<void>> => {
    return api.post('/auth/register', data);
  },

  login: async (data: LoginInput): Promise<ApiResponse<{ user: User }>> => {
    return api.post('/auth/login', data);
  },

  verifyEmail: async (token: string): Promise<ApiResponse<{ user: User }>> => {
    return api.get(`/auth/verify-email?token=${encodeURIComponent(token)}`);
  },

  resendVerification: async (data: ResendVerificationInput): Promise<ApiResponse<void>> => {
    return api.post('/auth/resend-verification', data);
  },

  refresh: async (): Promise<ApiResponse<void>> => {
    return api.get('/auth/refresh');
  },

  forgotPassword: async (data: ForgotPasswordInput): Promise<ApiResponse<void>> => {
    return api.post('/auth/forgot-password', data);
  },

  resetPassword: async (token: string, data: ResetPasswordInput): Promise<ApiResponse<void>> => {
    return api.post(`/auth/reset-password?token=${encodeURIComponent(token)}`, data);
  },

  getMe: async (): Promise<ApiResponse<{ user: User }>> => {
    return api.get('/auth/me');
  },

  logout: async (): Promise<ApiResponse<void>> => {
    return api.post('/auth/logout');
  },

  updateProfile: async (data: UpdateProfileInput): Promise<ApiResponse<{ user: User }>> => {
    return api.patch('/user/profile', data);
  },
};
