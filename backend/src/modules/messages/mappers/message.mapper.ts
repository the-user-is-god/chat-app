import { Message } from "@generated/prisma/client.js";
import { MessageEntity } from "../domain/message.entity.js";
import { MessageResponseDTO } from "../message.dto.js";

export class MessageMapper {
  static toDomainEntity(message: Message): MessageEntity {
    return {
      id: message.id,
      channelId: message.channelId,
      senderId: message.senderId,
      content: message.content,
      clientMessageId: message.clientMessageId,
      parentMessageId: message.parentMessageId,
      isEdited: message.isEdited,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      deletedAt: message.deletedAt,
    };
  }

  static toDomainEntities(messages: Message[]): MessageEntity[] {
    return messages.map((msg) => this.toDomainEntity(msg));
  }

  static toResponse(message: MessageEntity): MessageResponseDTO {
    // If the message is soft deleted, sanitize the content in response
    const isDeleted = Boolean(message.deletedAt);

    return {
      id: message.id,
      channelId: message.channelId,
      senderId: message.senderId,
      content: isDeleted ? "This message was deleted." : message.content,
      clientMessageId: message.clientMessageId,
      parentMessageId: message.parentMessageId,
      isEdited: message.isEdited,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      deletedAt: message.deletedAt,
    };
  }

  static toManyResponse(messages: MessageEntity[]): MessageResponseDTO[] {
    return messages.map((msg) => this.toResponse(msg));
  }
}
