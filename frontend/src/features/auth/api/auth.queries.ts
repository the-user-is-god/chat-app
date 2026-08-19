import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from './auth.api';
import { authKeys } from './auth.keys';

/**
 * Query hook fetching or caching current user session.
 */
export function useMeQuery(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const response = await authApi.getMe();
      return response.data.user;
    },
    enabled: options?.enabled,
    retry: false, // Don't spam retries if user is unauthenticated
  });
}

/**
 * Mutation hook invoking standard login contract.
 */
export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      // Optimistically plant fresh session payload data straight into the query cache
      queryClient.setQueryData(authKeys.me(), response.data.user);
    },
  });
}

/**
 * Mutation hook executing account registration workflow.
 */
export function useRegisterMutation() {
  return useMutation({
    mutationFn: authApi.register,
  });
}

/**
 * Mutation hook handling initial token link email validation.
 */
export function useVerifyEmailMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.verifyEmail,
    onSuccess: (response) => {
      console.log(response);

      queryClient.setQueryData(authKeys.me(), response.data.user);
    },
  });
}

/**
 * Mutation hook requesting password recovery mail.
 */
export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: authApi.forgotPassword,
  });
}

/**
 * Mutation hook completing password re-assignment.
 */
export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: ({ token, data }: { token: string; data: { newPassword: string } }) =>
      authApi.resetPassword(token, data),
  });
}

/**
 * Mutation hook terminating user cache and cookies.
 */
export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear entire local cache immediately on disconnect to ensure absolute tenant isolation
      queryClient.clear();
    },
  });
}

/**
 * Mutation hook processing account parameter changes.
 */
export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (response) => {
      queryClient.setQueryData(authKeys.me(), response.data.user);
    },
  });
}
