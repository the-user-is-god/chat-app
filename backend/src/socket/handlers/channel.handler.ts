import { logger } from "@lib/logger.js";
import { MemberRepository } from "@modules/channelMembers/repositories/channel-member.repository.js";
import { joinChannelSchema } from "@socket/validations/socket.validation.js";
import { Socket } from "socket.io";

export function registerChannelHandlers(socket: Socket, memberRepository: MemberRepository) {
  socket.on("channel:join", async (data) => {
    try {
      const { channelId } = joinChannelSchema.parse(data);
      const userId = socket.data.user.id;
      const roomName = `channel:${channelId}`;

      const member = await memberRepository.findByChannelAndUser(channelId, userId);

      if (!member) {
        socket.emit("channel:error", {
          channelId,
          message: "Access Denied: You are not a member of this channel",
        });
        return;
      }
      socket.join(roomName);
      logger.info(`User ${userId} joined socket room: ${roomName}`);

      // for user who joined
      socket.emit("channel:joined", { channelId, room: roomName });

      // for other members
      socket.to(roomName).emit("user:joined_channel", {
        socketId: socket.id,
        channelId,
      });
    } catch (error: any) {
      socket.emit("channel:error", {
        message: error.message || "Failed to join channel room",
      });
    }
  });

  socket.on("channel:leave", (data: { channelId: string }) => {
    try {
      const { channelId } = joinChannelSchema.parse(data);
      const roomName = `channel:${channelId}`;

      socket.leave(roomName);

      logger.info(`Socket ${socket.id} left room: ${roomName}`);

      socket.emit("channel:left", { channelId });

      socket.to(roomName).emit("user:left_channel", {
        socketId: socket.id,
        channelId,
      });
    } catch (error: any) {
      socket.emit("channel:error", {
        message: error.message || "Failed to leave channel",
      });
    }
  });
}
