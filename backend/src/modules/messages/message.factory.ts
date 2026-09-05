import { MessageService } from "./message.service.js";
import { MessageRepository } from "./repositories/message.repository.js";
import { MemberRepository } from "@modules/channelMembers/repositories/channel-member.repository.js";

const messageRepository = new MessageRepository();
const memberRepository = new MemberRepository();

export const messageService = new MessageService(messageRepository, memberRepository);
