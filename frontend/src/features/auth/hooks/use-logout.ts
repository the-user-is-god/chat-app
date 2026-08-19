import { useLogoutMutation } from '../api/auth.queries';

export function useLogout() {
  const mutation = useLogoutMutation();

  return {
    logout: async () => {
      return mutation.mutateAsync();
    },
    isLoading: mutation.isPending,
  };
}
