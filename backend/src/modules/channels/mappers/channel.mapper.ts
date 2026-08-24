import { Channel as PrismaChannel } from "@generated/prisma/client.js";
import { ChannelEntity } from "../domain/channel.entity.js";
import { ChannelResponseDTO } from "../channel.dto.js";

export class ChannelMapper {
  static toDomainEntity(channel: PrismaChannel): ChannelEntity {
    return {
      id: channel.id,
      name: channel.name,
      description: channel.description,
      avatar: channel.avatar,
      visibility: channel.visibility,
      createdById: channel.createdById,
      createdAt: channel.createdAt,
      updatedAt: channel.updatedAt,
    };
  }

  static toDomainEntities(channels: PrismaChannel[]): ChannelEntity[] {
    return channels.map((channel) => this.toDomainEntity(channel));
  }

  static toResponse(channel: ChannelEntity): ChannelResponseDTO {
    return {
      id: channel.id,
      name: channel.name,
      description: channel.description,
      avatar: channel.avatar,
      visibility: channel.visibility,
      createdById: channel.createdById,
      createdAt: channel.createdAt,
      updatedAt: channel.updatedAt,
    };
  }
}
