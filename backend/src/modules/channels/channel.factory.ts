import { MemberRepository } from "@modules/channelMembers/repositories/channel-member.repository.js";
import { ChannelService } from "./channel.service.js";
import { ChannelRepository } from "./repositories/channel.repository.js";

export function createChannelModule() {
  const channelRepository = new ChannelRepository();
  const channelMemberRepository = new MemberRepository();

  const channelService = new ChannelService(channelRepository, channelMemberRepository);

  return { channelService };
}

export const { channelService } = createChannelModule();
