export interface MessageEntity {
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
