import { useLoginMutation } from '../api/auth.queries';
import { LoginSchemaInput } from '../schemas/login.schema';
import { AppApiError } from '@/lib/api';

export function useLogin() {
  const mutation = useLoginMutation();

  return {
    login: async (data: LoginSchemaInput) => {
      return mutation.mutateAsync(data);
    },
    isLoading: mutation.isPending,
    error: mutation.error as AppApiError | null,
  };
}
