import { logger } from "@lib/logger.js";
import { Socket } from "socket.io";

export function registerChannelHandlers(socket: Socket) {
  socket.on("channel:join", (data) => {
    logger.info("Join channel:", data);
  });

  socket.on("channel:leave", (data) => {
    logger.info("Leave channel:", data);
  });
}
