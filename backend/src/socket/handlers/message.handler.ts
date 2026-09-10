import { logger } from "@lib/logger.js";
import { MessageMapper } from "@modules/messages/mappers/message.mapper.js";
import { MessageService } from "@modules/messages/message.service.js";
import {
  deleteMessageEventSchema,
  sendMessageEventSchema,
  updateMessageEventSchema,
} from "@socket/validations/socket.validation.js";
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

  socket.on("message:edit", async (data) => {
    try {
      const { channelId, messageId, content, clientMessageId, parentMessageId } =
        updateMessageEventSchema.parse(data);
      const userId = socket.data.user.id;

      const messageEntity = await messageService.editMessage(messageId, userId, {
        content,
        clientMessageId,
        parentMessageId,
      });

      const responseData = MessageMapper.toResponse(messageEntity);

      // Broadcast update to all room members
      const roomName = `channel:${channelId}`;
      io.to(roomName).emit("message:updated", { message: responseData });

      logger.info(`Message [${responseData.id}] updated to ${roomName}`);
    } catch (error: any) {
      logger.error(`Error handling message:edit (${socket.id}):`, error.message);

      // Emit error back ONLY to the sender socket
      socket.emit("message:error", {
        message: error.message || "Failed to process message",
      });
    }
  });

  socket.on("message:delete", async (data) => {
    try {
      const { channelId, messageId } = deleteMessageEventSchema.parse(data);
      const userId = socket.data.user.id;

      await messageService.deleteMessage(messageId, userId);

      // Broadcast deletion to all room members
      const roomName = `channel:${channelId}`;
      io.to(roomName).emit("message:deleted", { messageId });
      logger.info(`Message [${messageId}] deleted to ${roomName}`);
    } catch (error: any) {
      logger.error(`Error handling message:delete (${socket.id}):`, error.message);

      // Emit error back ONLY to the sender socket
      socket.emit("message:error", {
        message: error.message || "Failed to process message",
      });
    }
  });
}
