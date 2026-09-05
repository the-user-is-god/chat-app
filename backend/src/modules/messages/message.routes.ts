import { protect } from "@common/middleware/auth.middleware.js";
import { Router } from "express";
import { deleteMessage, getMessages, sendMessage } from "./message.controller.js";

export const messageRoutes = Router();

messageRoutes.use(protect);

// Channel-specific message history & HTTP send
messageRoutes.get("/channels/:channelId/messages", getMessages);
messageRoutes.post("/channels/:channelId/messages", sendMessage);

// Message item operations
messageRoutes.delete("/messages/:messageId", deleteMessage);
