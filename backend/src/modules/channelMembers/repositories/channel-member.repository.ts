import { ChannelMember, Prisma } from "@generated/prisma/client.js";
import { BaseRepository } from "@infrastructure/repositories/base.repository.js";
import { MemberEntity } from "../domain/channel-member.entity.js";
import { prisma } from "@infrastructure/db.js";
import { MemberMapper } from "../mappers/channel-member.mapper.js";

export class MemberRepository extends BaseRepository<
  ChannelMember,
  Prisma.ChannelMemberCreateInput,
  Prisma.ChannelMemberUpdateInput,
  MemberEntity
> {
  constructor() {
    super(prisma.channelMember, MemberMapper.toDomainEntity);
  }

  async findByChannelAndUser(channelId: string, userId: string): Promise<MemberEntity | null> {
    const member = await prisma.channelMember.findUnique({
      where: { channelId_userId: { channelId, userId } },
    });
    return member ? MemberMapper.toDomainEntity(member) : null;
  }

  async findByChannelId(channelId: string): Promise<MemberEntity[]> {
    const members = await prisma.channelMember.findMany({
      where: { channelId },
      include: { user: true },
    });
    return MemberMapper.toDomainEntities(members);
  }

  async deleteByChannelAndUser(channelId: string, userId: string): Promise<void> {
    await prisma.channelMember.delete({ where: { channelId_userId: { channelId, userId } } });
  }
}
