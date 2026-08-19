import { api, ApiResponse, PaginatedData } from '@/lib/api';
import { User, UpdateProfileInput } from '../types';

export const usersApi = {
  // Live Endpoint from your backend contract
  updateProfile: async (data: UpdateProfileInput): Promise<ApiResponse<{ user: User }>> => {
    return api.patch('/user/profile', data);
  },

  /**
   * Fetches paginated collection parameters of active users from the backend data node.
   */
  list: async (page: number, limit: number): Promise<ApiResponse<PaginatedData<User>>> => {
    // Hooked to your dynamic query endpoints - modify route target string based on your extended system
    return api.get(`/users?page=${page}&limit=${limit}`);
  },

  /**
   * Drops a user record by unique identifier.
   */
  delete: async (id: string): Promise<ApiResponse<void>> => {
    return api.delete(`/users/${id}`);
  },
};
