import { protect, requireVerification } from "@common/middleware/auth/auth.middleware.js";
import { validate } from "@common/middleware/validation.middleware.js";
import { channelParamsSchema } from "@modules/channels/channel.validation.js";
import { Router } from "express";
import { getMessagesQuerySchema, sendMessageSchema } from "../message.validation.js";
import { getMessages, sendMessage } from "../message.controller.js";

export const channelMessageRoutes = Router({ mergeParams: true });

channelMessageRoutes.use(protect, requireVerification);

channelMessageRoutes.get(
  "/",
  validate("params", channelParamsSchema),
  validate("query", getMessagesQuerySchema),
  getMessages,
);
channelMessageRoutes.post(
  "/",
  validate("params", channelParamsSchema),
  validate("body", sendMessageSchema),
  sendMessage,
);
