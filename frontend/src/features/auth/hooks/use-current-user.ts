import { useMeQuery } from '../api/auth.queries';

export function useCurrentUser() {
  const { data: user, isLoading, isError, refetch } = useMeQuery();

  return {
    user: user ?? null,
    isAuthenticated: !!user,
    isLoading,
    isError,
    refreshSession: refetch,
  };
}
