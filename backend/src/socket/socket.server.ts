import { ENV } from "@config/env.js";
import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { registerConnectionHandlers } from "./socket.register.js";
import cookieParser from "cookie-parser";
import { socketAuthMiddleware } from "./middlewares/auth.socket.js";

let io: Server;

export function initializeSocket(httpServer: HttpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: ENV.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    },
    cleanupEmptyChildNamespaces: true,
  });

  io.engine.use(cookieParser());

  socketAuthMiddleware(io);

  registerConnectionHandlers(io);
  return io;
}

// Helper function to safely export io instance globally
export function getIO(): Server {
  if (!io) {
    throw new Error("🚨 Critical: getIO() was called before initializeSocket()!");
  }
  return io;
}
