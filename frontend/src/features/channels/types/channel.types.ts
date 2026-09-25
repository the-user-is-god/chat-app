export interface Channel {
  id: string;
  name: string;
  description: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  memberCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
  isEdited?: boolean;
  replyTo?: { senderName: string; content: string } | null;
}

export type Visibility = 'PUBLIC' | 'PRIVATE';

export interface CreateChannelForm {
  name: string;
  description: string;
  visibility: Visibility;
}

export type CreateChannelFormErrors = Partial<Record<keyof CreateChannelForm, string>>;

export type ChannelRole = 'OWNER' | 'ADMIN' | 'MODERATOR' | 'MEMBER' | 'VIEWER';

export interface Member {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: ChannelRole;
  joinedAt: string;
}

export interface Invitation {
  id: string;
  code: string;
  maxUses: number | null;
  uses: number;
  expiresAt: string | null;
  isRevoked: boolean;
  createdAt: string;
}

export interface ChannelDetail {
  id: string;
  name: string;
  description: string | null;
  visibility: Visibility;
  memberCount: number;
  createdAt: string;
}
