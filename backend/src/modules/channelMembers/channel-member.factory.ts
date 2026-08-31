import { ChannelRepository } from "@modules/channels/repositories/channel.repository.js";
import { MemberRepository } from "./repositories/channel-member.repository.js";
import { MemberService } from "./channel-member.service.js";

export function createChannelMemberModule() {
  const channelRepository = new ChannelRepository();
  const channelMemberRepository = new MemberRepository();

  const memberService = new MemberService(channelMemberRepository, channelRepository);

  return { memberService };
}

export const { memberService } = createChannelMemberModule();
