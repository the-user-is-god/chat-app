// Updated src/features/users/hooks/use-users.ts
import { useUsersFilters } from './use-users-filters';
import {
  useUsersListQuery,
  useUpdateProfileMutation,
  useDeleteUserMutation,
} from '../api/users.queries';
import { UpdateProfileSchemaInput } from '../schemas/users.schema';
import { AppApiError } from '@/lib/api';

export function useUsers() {
  const { page, search, setFilters } = useUsersFilters();
  const limit = 5;

  const listQuery = useUsersListQuery(page, limit, search);
  const updateMutation = useUpdateProfileMutation();
  const deleteMutation = useDeleteUserMutation();

  return {
    users: listQuery.data?.items ?? [],
    pagination: listQuery.data?.meta ?? null,
    isLoading: listQuery.isLoading,
    isError: listQuery.isError,
    error: listQuery.error as AppApiError | null,

    // Bind navigation buttons to update url search parameters instead of local state variables
    nextPage: () => listQuery.data?.meta.hasNextPage && setFilters({ page: page + 1 }),
    prevPage: () => listQuery.data?.meta.hasPreviousPage && setFilters({ page: page - 1 }),
    currentPage: page,
    search,

    updateProfile: async (data: UpdateProfileSchemaInput) => updateMutation.mutateAsync(data),
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error as AppApiError | null,

    deleteUser: async (id: string) => {
      if (confirm('Drop user entity?')) return deleteMutation.mutateAsync(id);
    },
    isDeleting: deleteMutation.isPending,
  };
}
