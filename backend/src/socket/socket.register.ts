import { logger } from "@lib/logger.js";
import { Server } from "socket.io";
import { registerChannelHandlers } from "./handlers/channel.handler.js";
import { registerMessageHandler } from "./handlers/message.handler.js";
import { registerTypingHandler } from "./handlers/typing.handler.js";
import { MessageRepository } from "@modules/messages/repositories/message.repository.js";
import { MemberRepository } from "@modules/channelMembers/repositories/channel-member.repository.js";
import { MessageService } from "@modules/messages/message.service.js";

const messageRepository = new MessageRepository();
const memberRepository = new MemberRepository();
const messageService = new MessageService(messageRepository, memberRepository);

export function registerConnectionHandlers(io: Server) {
  io.on("connection", (socket) => {
    const user = socket.data.user;
    logger.info(`Client Connected: ${socket.id}, Authenticated user: ${user.id}`);

    // handlers
    registerChannelHandlers(socket, memberRepository);
    registerMessageHandler(socket, io, messageService);
    registerTypingHandler(socket);

    socket.on("disconnect", () => {
      logger.info(`Client Disconnected: ${socket.id}`);
    });
  });
}
