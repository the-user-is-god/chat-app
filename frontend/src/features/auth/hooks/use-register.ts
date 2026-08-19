import { useRegisterMutation } from '../api/auth.queries';
import { RegisterSchemaInput } from '../schemas/register.schema';
import { AppApiError } from '@/lib/api';

export function useRegister() {
  const mutation = useRegisterMutation();

  return {
    registerUser: async (data: RegisterSchemaInput) => {
      return mutation.mutateAsync(data);
    },
    isLoading: mutation.isPending,
    error: mutation.error as AppApiError | null,
    isSuccess: mutation.isSuccess,
  };
}
