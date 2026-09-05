import { Errors } from "@common/utils/errors.js";
import { MemberEntity } from "./domain/channel-member.entity.js";
import { MemberRepository } from "./repositories/channel-member.repository.js";
import { ChannelRepository } from "@modules/channels/repositories/channel.repository.js";
import { ChannelPermissions } from "./permissions/channel.permission.js";

export class MemberService {
  constructor(
    private channelMemberRepository: MemberRepository,
    private channelRepository: ChannelRepository,
  ) {}

  async findMemberShip(channelId: string, userId: string): Promise<MemberEntity | null> {
    return this.channelMemberRepository.findByChannelAndUser(channelId, userId);
  }

  async createMemberShip(
    channelId: string,
    userId: string,
    role: MemberEntity["role"] = "MEMBER",
  ): Promise<MemberEntity> {
    const existingMember = await this.findMemberShip(channelId, userId);
    if (existingMember) {
      throw Errors.badRequest("Already a member of this channel");
    }

    return this.channelMemberRepository.create({
      channel: { connect: { id: channelId } },
      user: { connect: { id: userId } },
      role,
    });
  }

  async getMyMembership(channelId: string, userId: string): Promise<MemberEntity> {
    const membership = await this.channelMemberRepository.findByChannelAndUser(channelId, userId);
    if (!membership) {
      throw Errors.notFound("Membership not found for this channel.");
    }

    return membership;
  }

  async joinPublicChannel(channelId: string, userId: string): Promise<MemberEntity> {
    const channel = await this.channelRepository.findById(channelId);

    if (!channel) {
      throw Errors.notFound("Channel not Found");
    }

    if (channel.visibility !== "PUBLIC") {
      throw Errors.forbidden("Cannot directly join the private channel without invitation");
    }

    return this.createMemberShip(channelId, userId, "MEMBER");
  }

  async leaveChannel(channelId: string, userId: string): Promise<void> {
    const member = await this.findMemberShip(channelId, userId);

    if (!member) {
      throw Errors.notFound("User is not a member of this channel");
    }

    if (!ChannelPermissions.canLeaveChannel(member.role)) {
      throw Errors.badRequest(
        "Channel Owner cannot leave the channel without transferring the ownership",
      );
    }

    await this.channelMemberRepository.deleteByChannelAndUser(channelId, userId);
  }

  async listMembers(channelId: string, userId: string): Promise<MemberEntity[]> {
    const membership = await this.channelMemberRepository.findByChannelAndUser(channelId, userId);
    if (!membership) {
      throw Errors.forbidden("Access denied. You are not a member of this channel.");
    }
    return this.channelMemberRepository.findByChannelId(channelId);
  }
}
