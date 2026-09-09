import { logger } from "@lib/logger.js";
import { MessageMapper } from "@modules/messages/mappers/message.mapper.js";
import { MessageService } from "@modules/messages/message.service.js";
import { sendMessageEventSchema } from "@socket/validations/socket.validation.js";
import { Server, Socket } from "socket.io";

export function registerMessageHandler(socket: Socket, io: Server, messageService: MessageService) {
  socket.on("message:send", async (data) => {
    try {
      const { channelId, content, clientMessageId, parentMessageId } =
        sendMessageEventSchema.parse(data);
      const userId = socket.data.user.id;

      const messageEntity = await messageService.sendMessage(channelId, userId, {
        content,
        clientMessageId,
        parentMessageId,
      });

      const responseData = MessageMapper.toResponse(messageEntity);

      const roomName = `channel:${channelId}`;
      io.to(roomName).emit("message:new", { message: responseData });

      logger.info(`Message [${responseData.id}] emitted to ${roomName}`);
    } catch (error: any) {
      logger.error(`Error handling message:send (${socket.id}):`, error.message);

      // Emit error back ONLY to the sender socket
      socket.emit("message:error", {
        message: error.message || "Failed to process message",
      });
    }
  });

  //   socket.on("message:send", async (payload, callback) => {
  //     try {
  //       const input = sendMessageSchema.parse(payload);
  //       const message = await messageService.sendMessage()
  //       error;
  //     } catch (error) {}
  //   });

  socket.on("message:edit", (data: { channelId: string; messageId: string; content: string }) => {
    const { channelId, messageId, content } = data;
    const roomName = `channel:${channelId}`;

    // Broadcast update to all room members
    io.to(roomName).emit("message:updated", { messageId, content });
  });

  socket.on("message:delete", (data: { channelId: string; messageId: string }) => {
    const { channelId, messageId } = data;
    const roomName = `channel:${channelId}`;

    // Broadcast deletion to all room members
    io.to(roomName).emit("message:deleted", { messageId });
  });
}
