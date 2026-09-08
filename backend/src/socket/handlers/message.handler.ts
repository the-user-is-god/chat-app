import { logger } from "@lib/logger.js";
import { Socket } from "socket.io";

export function registerMessageHandler(socket: Socket) {
  socket.on("message:send", (data) => {
    logger.info("Message received", data);
  });

  socket.on("message:edit", (data) => {
    logger.info("Message edited", data);
  });

  socket.on("message:delete", (data) => {
    logger.info("Message deleted", data);
  });
}
