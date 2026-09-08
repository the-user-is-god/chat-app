import { protect } from "@common/middleware/auth/auth.middleware.js";
import { Server } from "socket.io";

export function socketAuthMiddleware(io: Server) {
  return io.use((socket, next) => {
    protect(socket.request as any, {} as any, (err?: any) => {
      if (err) {
        // If protect returns an AppError, cleanly pass it to Socket.IO
        return next(new Error(err.message || "Authentication failed"));
      }

      // Success! Your middleware attached 'user' to req, now we move it to the socket
      socket.data.user = (socket.request as any).user;
      next();
    });
  });
}
