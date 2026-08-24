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
}
