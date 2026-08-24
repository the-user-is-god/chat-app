import { ChannelMember } from "@generated/prisma/client.js";
import { MemberEntity } from "../domain/channel-member.entity.js";

export class MemberMapper {
  static toDomainEntity(member: ChannelMember): MemberEntity {
    return {
      id: member.id,
      channelId: member.channelId,
      userId: member.userId,
      role: member.role,
      joinedAt: member.joinedAt,
      lastReadMessageId: member.lastReadMessageId,
    };
  }
}
