import { authenticateUser } from "@common/middleware/auth/auth.service.js";
import { SocketRequest } from "@socket/types/socket.types.js";
import { Server } from "socket.io";

const getBearerToken = (authorization?: string): string | undefined => {
  if (!authorization?.startsWith("Bearer ")) return undefined;
  return authorization.split(" ")[1];
};

export function socketAuthMiddleware(io: Server) {
  io.use(async (socket, next) => {
    try {
      const request = socket.request as SocketRequest;
      const token =
        request.cookies?.accessToken ||
        getBearerToken(socket.handshake.headers.authorization) ||
        socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("You are not logged in"));
      }

      const user = await authenticateUser(token);

      socket.data.user = user;

      next();
    } catch (error) {
      next(new Error(error instanceof Error ? error.message : "Authentication failed"));
    }
  });
}
