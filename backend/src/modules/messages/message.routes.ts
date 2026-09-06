import { protect } from "@common/middleware/auth.middleware.js";
import { Router } from "express";
import { deleteMessage, getMessages, sendMessage } from "./message.controller.js";
import { validate } from "@common/middleware/validation.middleware.js";
import {
  channelParamsSchema,
  getMessagesQuerySchema,
  sendMessageSchema,
} from "./message.validation.js";

export const messageRoutes = Router();

messageRoutes.use(protect);

// Channel-specific message history & HTTP send
messageRoutes.get(
  "/channels/:channelId/messages",
  validate("params", channelParamsSchema),
  validate("query", getMessagesQuerySchema),
  getMessages,
);
messageRoutes.post(
  "/channels/:channelId/messages",
  validate("params", channelParamsSchema),
  validate("body", sendMessageSchema),
  sendMessage,
);

// Message item operations
messageRoutes.delete(
  "/messages/:messageId",
  validate("params", channelParamsSchema),
  deleteMessage,
);
