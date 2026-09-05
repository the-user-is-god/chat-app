import { Message, Prisma } from "@generated/prisma/client.js";
import { BaseRepository } from "@infrastructure/repositories/base.repository.js";
import { MessageEntity } from "../domain/message.entity.js";
import { prisma } from "@infrastructure/db.js";
import { MessageMapper } from "../mappers/message.mapper.js";

export class MessageRepository extends BaseRepository<
  Message,
  Prisma.MessageCreateInput,
  Prisma.MessageUpdateInput,
  MessageEntity
> {
  constructor() {
    super(prisma.message, MessageMapper.toDomainEntity);
  }

  async findByChannelWithCursor(
    channelId: string,
    limit: number,
    cursor?: string,
  ): Promise<MessageEntity[]> {
    const messages = await prisma.message.findMany({
      where: {
        channelId,
      },
      take: limit + 1, // fetch one extra to determine next cursor
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      orderBy: { createdAt: "desc" },
    });

    return MessageMapper.toDomainEntities(messages);
  }
  async findByIdempotencyKey(
    channelId: string,
    clientMessageId: string,
  ): Promise<MessageEntity | null> {
    const message = await prisma.message.findFirst({
      where: { channelId, clientMessageId },
    });
    return message ? MessageMapper.toDomainEntity(message) : null;
  }

  async softDelete(id: string): Promise<MessageEntity> {
    const updated = await prisma.message.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return MessageMapper.toDomainEntity(updated);
  }
}
