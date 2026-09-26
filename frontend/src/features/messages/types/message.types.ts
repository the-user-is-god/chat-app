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
}

export interface CursorPaginatedData<T> {
  messages: T[];
  nextCursor: string | null;
  //   meta: CursorPageMeta;
}

export interface GetMessagesParams {
  cursor?: string;
  limit?: number;
}
