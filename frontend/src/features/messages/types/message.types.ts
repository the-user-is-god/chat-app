// features/messages/types/message.types.ts
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
  isEdited?: boolean;
  replyTo?: { senderName: string; content: string } | null;
}

export interface SendMessageInput {
  content: string;
  replyToId?: string;
}

export interface UpdateMessageInput {
  content: string;
}

export interface CursorPageMeta {
  nextCursor: string | null;
  hasNextPage: boolean;
}

export interface CursorPaginatedData<T> {
  items: T[];
  meta: CursorPageMeta;
}

export interface GetMessagesParams {
  cursor?: string;
  limit?: number;
}
