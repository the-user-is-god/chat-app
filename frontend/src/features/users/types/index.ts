import { User } from '@/features/auth/types/auth.types';

export type { User };

export interface UpdateProfileInput {
  name: string;
}

export interface UserListFilters {
  page: number;
  limit: number;
}

export interface MyChannel {
  id: string;
  name: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  memberCount: number;
  createdAt: string;
}
