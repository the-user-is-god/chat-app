import { ChannelMember } from "@generated/prisma/client.js";
import { MemberEntity } from "../domain/channel-member.entity.js";
import { MemberResponseDTO } from "../channel-member.dto.js";

export class MemberMapper {
  static toDomainEntity(member: ChannelMember): MemberEntity {
    return {
      id: member.id,
      channelId: member.channelId,
      userId: member.userId,
      role: member.role,
      joinedAt: member.joinedAt,
      lastReadMessageId: member.lastReadMessageId,
      // user: {
      //   name:
      // }
    };
  }

  static toDomainEntities(members: ChannelMember[]): MemberEntity[] {
    return members.map((member) => this.toDomainEntity(member));
  }

  static toResponse(member: MemberEntity): MemberResponseDTO {
    return {
      id: member.id,
      channelId: member.channelId,
      userId: member.userId,
      role: member.role,
      joinedAt: member.joinedAt,
      lastReadMessageId: member.lastReadMessageId,
    };
  }

  static toManyResponse(members: MemberEntity[]): MemberResponseDTO[] {
    return members.map((channel) => this.toResponse(channel));
  }
}
