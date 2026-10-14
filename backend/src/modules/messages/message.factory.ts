import { ChannelRepository } from "@modules/channels/repositories/channel.repository.js";
import { MessageService } from "./message.service.js";
import { MessageRepository } from "./repositories/message.repository.js";
import { MemberRepository } from "@modules/channelMembers/repositories/channel-member.repository.js";

const messageRepository = new MessageRepository();
const memberRepository = new MemberRepository();
const channelRepository = new ChannelRepository();

export const messageService = new MessageService(
  messageRepository,
  memberRepository,
  channelRepository,
);
