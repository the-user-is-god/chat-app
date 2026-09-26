import { protect, requireVerification } from "@common/middleware/auth/auth.middleware.js";
import { Router } from "express";
import { validate } from "@common/middleware/validation.middleware.js";
import { messageParamsSchema, updateMessageSchema } from "../message.validation.js";
import { deleteMessage, editMessage } from "../message.controller.js";

export const messageRoutes = Router();

messageRoutes.use(protect, requireVerification);

messageRoutes.patch(
  "/messages/:messageId",
  validate("body", updateMessageSchema),
  validate("params", messageParamsSchema),
  editMessage,
);
// Message item operations
messageRoutes.delete(
  "/messages/:messageId",
  validate("params", messageParamsSchema),
  deleteMessage,
);
