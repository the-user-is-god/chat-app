export interface SendMessageDTO {
  content: string;
  clientMessageId?: string;
  parentMessageId?: string;
}

export interface GetMessagesQueryDTO {
  cursor?: string;
  limit?: number;
}

export interface MessageResponseDTO {
  id: string;
  channelId: string;
  senderId: string;
  content: string;
  clientMessageId?: string | null;
  parentMessageId?: string | null;
  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
