/**
 * Direct representation of user objects returned by your /auth/me endpoint.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Endpoint response shapes matching your Express JSON layout envelopes.
 */
export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

/**
 * Registration Input Contract
 */
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

/**
 * Login Input Contract
 */
export interface LoginInput {
  email: string;
  password: string;
}

/**
 * Request Password Reset Input Contract
 */
export interface ForgotPasswordInput {
  email: string;
}

/**
 * Submit New Password Input Contract
 */
export interface ResetPasswordInput {
  newPassword: string;
}

/**
 * Resend Email Verification Input Contract
 */
export interface ResendVerificationInput {
  email: string;
}

/**
 * Profile Modification Input Contract
 */
export interface UpdateProfileInput {
  name: string;
}
