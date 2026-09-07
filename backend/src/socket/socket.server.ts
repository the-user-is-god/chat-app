import { ENV } from "@config/env.js";
import { logger } from "@lib/logger.js";
import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";

let io: Server;

export function initializeSocket(httpServer: HttpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: ENV.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    logger.info(`Client Connected: ${socket.id}`);

    socket.on("disconnect", () => {
      logger.info(`Client Disconnected: ${socket.id}`);
    });
  });

  return io;
}

// Helper function to safely export io instance globally
export function getIO(): Server {
  if (!io) {
    throw new Error("🚨 Critical: getIO() was called before initializeSocket()!");
  }
  return io;
}
