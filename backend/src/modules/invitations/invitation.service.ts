import { MemberRepository } from "@modules/channelMembers/repositories/channel-member.repository.js";
import { InvitationRepository } from "./repositories/invitation.repository.js";
import { ChannelRepository } from "@modules/channels/repositories/channel.repository.js";
import { CreateInviteDTO } from "./invitation.dto.js";
import { InvitationEntity } from "./domain/invitation.entity.js";
import { Errors } from "@common/utils/errors.js";
import { ChannelPermissions } from "@modules/channelMembers/permissions/channel.permission.js";
import { MemberEntity } from "@modules/channelMembers/domain/channel-member.entity.js";

export class InvitationService {
  constructor(
    private invitationRepository: InvitationRepository,
    private memberRepository: MemberRepository,
    private channelRepository: ChannelRepository,
  ) {}

  async createInvite(
    channelId: string,
    userId: string,

    dto: CreateInviteDTO,
  ): Promise<InvitationEntity> {
    const channel = await this.channelRepository.findById(channelId);

    if (!channel) {
      throw Errors.notFound("Channel not found.");
    }

    const member = await this.memberRepository.findByChannelAndUser(channelId, userId);
    if (!member || !ChannelPermissions.canInvite(member.role)) {
      throw Errors.forbidden("You do not have permission to create invite links for this channel.");
    }

    const expiresAt = dto.expiresAt ? new Date(dto.expiresAt) : null;

    return this.invitationRepository.create({
      channel: { connect: { id: channelId } },
      createdBy: { connect: { id: userId } },
      maxUses: dto.maxUses ?? null,
      expiresAt,
    });
  }

  async validateInvite(code: string): Promise<InvitationEntity> {
    const invite = await this.invitationRepository.findByCode(code);
    if (!invite) {
      throw Errors.notFound("Invalid or nonexistent invitation code.");
    }

    if (invite.isRevoked) {
      throw Errors.badRequest("This invitation link has been revoked.");
    }

    if (invite.expiresAt && invite.expiresAt < new Date()) {
      throw Errors.badRequest("This invitation link has expired.");
    }

    if (invite.maxUses !== null && invite.uses >= invite.maxUses) {
      throw Errors.badRequest("This invitation link has reached its maximum usage limit.");
    }

    return invite;
  }

  async joinWithInvite(code: string, userId: string): Promise<MemberEntity> {
    const invite = await this.validateInvite(code);

    const existingMember = await this.memberRepository.findByChannelAndUser(
      invite.channelId,
      userId,
    );
    if (existingMember) {
      throw Errors.badRequest("You are already a member of this channel.");
    }

    // Increment usage count and create channel membership
    await this.invitationRepository.incrementUses(invite.id);

    return this.memberRepository.create({
      channel: { connect: { id: invite.channelId } },
      user: { connect: { id: userId } },
      role: "MEMBER",
    });
  }

  async revokeInvite(inviteId: string, userId: string): Promise<InvitationEntity> {
    const invite = await this.invitationRepository.findById(inviteId);
    if (!invite) {
      throw Errors.notFound("Invitation not found.");
    }

    const member = await this.memberRepository.findByChannelAndUser(invite.channelId, userId);
    if (!member || !ChannelPermissions.canManageChannel(member.role)) {
      throw Errors.forbidden("Only Channel Owners or Admins can revoke invitation links.");
    }

    return this.invitationRepository.revoke(invite.id);
  }
}
