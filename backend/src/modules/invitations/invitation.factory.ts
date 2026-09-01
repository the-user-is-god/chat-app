import { InvitationRepository } from "./repositories/invitation.repository.js";
import { MemberRepository } from "@modules/channelMembers/repositories/channel-member.repository.js";
import { ChannelRepository } from "@modules/channels/repositories/channel.repository.js";
import { InvitationService } from "./invitation.service.js";

const invitationRepository = new InvitationRepository();
const memberRepository = new MemberRepository();
const channelRepository = new ChannelRepository();

export const invitationService = new InvitationService(
  invitationRepository,
  memberRepository,
  channelRepository,
);
