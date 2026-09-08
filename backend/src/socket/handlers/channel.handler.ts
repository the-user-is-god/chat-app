import { logger } from "@lib/logger.js";
import { Socket } from "socket.io";

export function registerChannelHandlers(socket: Socket) {
  socket.on("channel:join", (data: { channelId: string }) => {
    const { channelId } = data;
    const roomName = `channel:${channelId}`;

    socket.join(roomName);
    logger.info(`Socket ${socket.id} joined room: ${roomName}`);

    // for user who joined
    socket.emit("channel:joined", { channelId, room: roomName });

    // for other members
    socket.to(roomName).emit("user:joined_channel", {
      socketId: socket.id,
      channelId,
    });
  });

  socket.on("channel:leave", (data: { channelId: string }) => {
    const { channelId } = data;
    const roomName = `channel:${channelId}`;

    // Remove socket from the room
    socket.leave(roomName);
    logger.info(`Socket ${socket.id} left room: ${roomName}`);

    // Confirm leave to the client
    socket.emit("channel:left", { channelId });

    // Notify remaining members
    socket.to(roomName).emit("user:left_channel", {
      socketId: socket.id,
      channelId,
    });
  });
}
