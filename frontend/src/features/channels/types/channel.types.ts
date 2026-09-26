export interface Channel {
  id: string;
  name: string;
  description: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  memberCount: number;
}

export type Visibility = 'PUBLIC' | 'PRIVATE';

export interface CreateChannelInput {
  name: string;
  description: string;
  visibility: Visibility;
}

export type CreateChannelFormErrors = Partial<Record<keyof CreateChannelInput, string>>;

export type ChannelRole = 'OWNER' | 'ADMIN' | 'MODERATOR' | 'MEMBER' | 'VIEWER';

export interface Member {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: ChannelRole;
  joinedAt: string;
}

export interface ChannelDetail {
  id: string;
  name: string;
  description: string | null;
  visibility: Visibility;
  memberCount: number;
  createdAt: string;
}

export type ChannelCategory = 'trending' | 'technology' | 'design' | 'general';

export interface PublicChannel {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  messageCount: number;
  visibility: 'PUBLIC';
  category: ChannelCategory;
  isJoined: boolean;
}

export type ExploreCategory = 'all' | ChannelCategory;
