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
