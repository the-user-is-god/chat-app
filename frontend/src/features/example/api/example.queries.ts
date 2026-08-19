import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { exampleApi } from './example.api';
import { exampleKeys } from './example.keys';

export function useExamplesQuery() {
  return useQuery({
    queryKey: exampleKeys.lists(),
    queryFn: async () => {
      const res = await exampleApi.list();
      return res.data;
    },
  });
}

export function useCreateExampleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: exampleApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
}
