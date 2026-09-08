import { Socket } from "socket.io";

export function registerTypingHandler(socket: Socket) {
  socket.on("typing:start", (data) => {
    socket.broadcast.emit("user:typing", { data });
  });

  socket.on("typing:stop", (data) => {
    socket.broadcast.emit("stopped:typing", { data });
  });
}
