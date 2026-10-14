import { ChannelMember, Prisma } from "@generated/prisma/client.js";
import { BaseRepository } from "@infrastructure/repositories/base.repository.js";
import { MemberEntity } from "../domain/channel-member.entity.js";
import { prisma } from "@infrastructure/db.js";
import { MemberMapper } from "../mappers/channel-member.mapper.js";
import { Errors } from "@common/utils/errors.js";

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

  async updateRole(
    channelId: string,
    targetId: string,
    newRole: MemberEntity["role"],
  ): Promise<MemberEntity> {
    const updatedMember = await prisma.channelMember.update({
      where: { channelId_userId: { channelId, userId: targetId } },
      data: { role: newRole },
    });

    return MemberMapper.toDomainEntity(updatedMember);
  }

  async transferOwnership(
    channelId: string,
    currentOwnerId: string,
    newOwnerId: string,
  ): Promise<void> {
    await prisma.$transaction(async (tx) => {
      // Recheck ownership inside the transaction.
      const owner = await tx.channelMember.findFirst({
        where: {
          channelId,
          userId: currentOwnerId,
          role: "OWNER",
        },
      });

      if (!owner) {
        throw Errors.forbidden("You are no longer the owner of this channel.");
      }

      // Ensure the target is still a member.
      const target = await tx.channelMember.findFirst({
        where: {
          channelId,
          userId: newOwnerId,
        },
      });

      if (!target) {
        throw Errors.badRequest("The new owner must be a member of this channel.");
      }

      // Promote the new owner.
      await tx.channelMember.update({
        where: {
          id: target.id,
        },
        data: {
          role: "OWNER",
        },
      });

      // Demote the previous owner.
      await tx.channelMember.update({
        where: {
          id: owner.id,
        },
        data: {
          role: "ADMIN",
        },
      });
    });
  }
}
