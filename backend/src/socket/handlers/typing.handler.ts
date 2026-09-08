import { Socket } from "socket.io";

export function registerTypingHandler(socket: Socket) {
  socket.on("typing:start", (data: { channelId: string }) => {
    const roomName = `channel:${data.channelId}`;

    // Broadcast typing state to everyone in the room EXCEPT the user who is typing
    socket.to(roomName).emit("user:typing", {
      socketId: socket.id,
      channelId: data.channelId,
    });
  });

  socket.on("typing:stop", (data: { channelId: string }) => {
    const roomName = `channel:${data.channelId}`;

    // Broadcast stopped typing event to everyone EXCEPT sender
    socket.to(roomName).emit("stopped:typing", {
      socketId: socket.id,
      channelId: data.channelId,
    });
  });
}
