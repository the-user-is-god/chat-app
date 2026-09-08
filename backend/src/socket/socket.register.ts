import { logger } from "@lib/logger.js";
import { Server } from "socket.io";
import { registerChannelHandlers } from "./handlers/channel.handler.js";
import { registerMessageHandler } from "./handlers/message.handler.js";
import { registerTypingHandler } from "./handlers/typing.handler.js";

export function registerConnectionHandlers(io: Server) {
  io.on("connection", (socket) => {
    logger.info(`Client Connected: ${socket.id}`);

    // handlers
    registerChannelHandlers(socket);
    registerMessageHandler(socket, io);
    registerTypingHandler(socket);

    socket.on("disconnect", () => {
      logger.info(`Client Disconnected: ${socket.id}`);
    });
  });
}
