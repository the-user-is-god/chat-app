import { useExamplesQuery, useCreateExampleMutation } from '../api/example.queries';
import { ExampleSchemaInput } from '../schemas/example.schema';
import { AppApiError } from '@/lib/api';

export function useExample() {
  const listQuery = useExamplesQuery();
  const createMutation = useCreateExampleMutation();

  return {
    items: listQuery.data ?? [],
    isLoading: listQuery.isLoading,
    isError: listQuery.isError,
    error: listQuery.error as AppApiError | null,

    createItem: async (data: ExampleSchemaInput) => {
      return createMutation.mutateAsync(data);
    },
    isCreating: createMutation.isPending,
  };
}
