import { Channel, Prisma } from "@generated/prisma/client.js";
import { BaseRepository } from "@infrastructure/repositories/base.repository.js";
import { ChannelEntity } from "../domain/channel.entity.js";
import { prisma } from "@infrastructure/db.js";
import { ChannelMapper } from "../mappers/channel.mapper.js";

export class ChannelRepository extends BaseRepository<
  Channel,
  Prisma.ChannelCreateInput,
  Prisma.ChannelUpdateInput,
  ChannelEntity
> {
  constructor() {
    super(prisma.channel, ChannelMapper.toDomainEntity);
  }

  async findPublicChannels(): Promise<ChannelEntity[] | null> {
    const channels = await prisma.channel.findMany({ where: { visibility: "PUBLIC" } });
    return channels ? ChannelMapper.toDomainEntities(channels) : null;
  }
}
