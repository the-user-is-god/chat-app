import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usersApi } from './users.api';
import { usersKeys } from './users.keys';
import { authKeys } from '@/features/auth/api/auth.keys';

export function useUsersListQuery(page: number, limit: number, search: string) {
  return useQuery({
    queryKey: usersKeys.list(page, limit, search),
    queryFn: async () => {
      // Modify usersApi.list method signature slightly to pass search flags downstream
      const response = await usersApi.list(page, limit);

      // Client-side text array matching simulator (for validation since backend is limited)
      if (search) {
        const keyword = search.toLowerCase();
        const filteredItems = response.data.items.filter(
          (user) =>
            user.name.toLowerCase().includes(keyword) || user.email.toLowerCase().includes(keyword)
        );
        return { ...response.data, items: filteredItems };
      }

      return response.data;
    },
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersApi.updateProfile,
    onSuccess: (response) => {
      // Keep the core auth user cache fresh and synchronized across layouts
      queryClient.setQueryData(authKeys.me(), response.data.user);
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}
