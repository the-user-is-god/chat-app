import { validate } from "@common/middleware/validation.middleware.js";
import express from "express";
import { channelParamsSchema, createChannelSchema } from "./channel.validation.js";
import {
  createChannel,
  getChannelById,
  getJoinedChannels,
  getPublicChannels,
} from "./channel.controller.js";
import { protect, requireVerification } from "@common/middleware/auth.middleware.js";

export const channelRoutes = express.Router();

channelRoutes.post(
  "/",
  protect,
  requireVerification,
  validate("body", createChannelSchema),
  createChannel,
);
channelRoutes.get("/me", protect, requireVerification, getJoinedChannels);
// public apis
channelRoutes.get("/", getPublicChannels);
channelRoutes.get("/:channelId", validate("params", channelParamsSchema), getChannelById);
