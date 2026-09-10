import { logger } from "@lib/logger.js";
import { MessageMapper } from "@modules/messages/mappers/message.mapper.js";
import { MessageService } from "@modules/messages/message.service.js";
import {
  deleteMessageEventSchema,
  sendMessageEventSchema,
  updateMessageEventSchema,
} from "@socket/validations/socket.validation.js";
import { Server, Socket } from "socket.io";
import { ZodError } from "zod";

export function registerMessageHandler(socket: Socket, io: Server, messageService: MessageService) {
  socket.on("message:send", async (data, ack) => {
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

      // sending acknowledgement to sender
      if (typeof ack === "function") {
        ack({
          success: true,
          message: responseData,
        });
      }
    } catch (error: any) {
      logger.error(`Error handling message:send (${socket.id}):`, error.message);
      // acknowledge if any error is got
      if (typeof ack === "function") {
        if (error instanceof ZodError) {
          return ack({
            success: false,
            error: "Validation failed",
            details: error.flatten().fieldErrors,
          });
        }

        return ack({
          success: false,
          error: error.message || "Failed to process message",
        });
      }
      // Emit error back ONLY to the sender socket
      socket.emit("message:error", {
        message: error.message || "Failed to process message",
      });
    }
  });

  socket.on("message:edit", async (data, ack) => {
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

      // sending acknowledgement to sender
      if (typeof ack === "function") {
        ack({
          success: true,
          message: responseData,
        });
      }
    } catch (error: any) {
      logger.error(`Error handling message:edit (${socket.id}):`, error.message);

      // acknowledge if any error is got
      if (typeof ack === "function") {
        if (error instanceof ZodError) {
          return ack({
            success: false,
            error: "Validation failed",
            details: error.flatten().fieldErrors,
          });
        }

        return ack({
          success: false,
          error: error.message || "Failed to process message",
        });
      }

      // Emit error back ONLY to the sender socket
      socket.emit("message:error", {
        message: error.message || "Failed to process message",
      });
    }
  });

  socket.on("message:delete", async (data, ack) => {
    try {
      const { channelId, messageId } = deleteMessageEventSchema.parse(data);
      const userId = socket.data.user.id;

      await messageService.deleteMessage(messageId, userId);

      // Broadcast deletion to all room members
      const roomName = `channel:${channelId}`;
      io.to(roomName).emit("message:deleted", { messageId });
      logger.info(`Message [${messageId}] deleted to ${roomName}`);

      // sending acknowledgement to sender
      if (typeof ack === "function") {
        ack({
          success: true,
        });
      }
    } catch (error: any) {
      logger.error(`Error handling message:delete (${socket.id}):`, error.message);

      // acknowledge if any error is got
      if (typeof ack === "function") {
        if (error instanceof ZodError) {
          return ack({
            success: false,
            error: "Validation failed",
            details: error.flatten().fieldErrors,
          });
        }

        return ack({
          success: false,
          error: error.message || "Failed to process message",
        });
      }

      // Emit error back ONLY to the sender socket
      socket.emit("message:error", {
        message: error.message || "Failed to process message",
      });
    }
  });
}
