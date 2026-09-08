import { logger } from "@lib/logger.js";
import { Server, Socket } from "socket.io";

export function registerMessageHandler(socket: Socket, io: Server) {
  socket.on("message:send", (data: { channelId: string; content: string }) => {
    const { channelId, content } = data;
    const roomName = `channel:${channelId}`;

    logger.info(`Message received in ${roomName}: ${content}`);

    const messagePayload = {
      id: `msg-${Date.now()}`,
      channelId,
      senderSocketId: socket.id,
      content,
      createdAt: new Date().toISOString(),
    };

    io.to(roomName).emit("message:new", messagePayload);
  });

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
