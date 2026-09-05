import { MemberRepository } from "@modules/channelMembers/repositories/channel-member.repository.js";
import { MessageRepository } from "./repositories/message.repository.js";
import { GetMessagesQueryDTO, SendMessageDTO } from "./message.dto.js";
import { MessageEntity } from "./domain/message.entity.js";
import { Errors } from "@common/utils/errors.js";
import { ChannelPermissions } from "@modules/channelMembers/permissions/channel.permission.js";

export class MessageService {
  constructor(
    private messageRepository: MessageRepository,
    private memberRepository: MemberRepository,
  ) {}

  async sendMessage(
    channelId: string,
    userId: string,
    dto: SendMessageDTO,
  ): Promise<MessageEntity> {
    const member = await this.memberRepository.findByChannelAndUser(channelId, userId);

    if (!member) {
      throw Errors.forbidden("Access Denied. You are not the member of this channel");
    }

    if (!ChannelPermissions.canSendMessages(member.role)) {
      throw Errors.forbidden("You are not allowed to send messages in this channel.");
    }
    // Idempotency check: prevent duplicate sends on network retries
    if (dto.clientMessageId) {
      const existing = await this.messageRepository.findByIdempotencyKey(
        channelId,
        dto.clientMessageId,
      );
      if (existing) {
        return existing;
      }
    }

    return this.messageRepository.create({
      channel: { connect: { id: channelId } },
      sender: { connect: { id: userId } },
      content: dto.content,
      clientMessageId: dto.clientMessageId ?? null,
      parent: dto.parentMessageId ? { connect: { id: dto.parentMessageId } } : undefined,
    });
  }

  async getMessages(
    channelId: string,
    userId: string,
    query: GetMessagesQueryDTO,
  ): Promise<{ messages: MessageEntity[]; nextCursor: string | null }> {
    const member = await this.memberRepository.findByChannelAndUser(channelId, userId);
    if (!member) {
      throw Errors.forbidden("Access denied. You are not a member of this channel.");
    }

    const limit = query.limit && query.limit > 0 ? Math.min(query.limit, 50) : 30;
    const items = await this.messageRepository.findByChannelWithCursor(
      channelId,
      limit,
      query.cursor,
    );

    let nextCursor: string | null = null;
    if (items.length > limit) {
      const nextItem = items.pop();
      nextCursor = nextItem?.id ?? null;
    }

    return { messages: items, nextCursor };
  }

  async deleteMessage(messageId: string, userId: string): Promise<MessageEntity> {
    const message = await this.messageRepository.findById(messageId);
    if (!message) {
      throw Errors.notFound("Message not found.");
    }

    const member = await this.memberRepository.findByChannelAndUser(message.channelId, userId);
    if (!member) {
      throw Errors.forbidden("Access Denied. You are not a member of the channel");
    }
    if (!ChannelPermissions.canDeleteMessages(member.role)) {
      throw Errors.forbidden("You are not allowed to perform this action");
    }

    return this.messageRepository.softDelete(messageId);
  }
}
