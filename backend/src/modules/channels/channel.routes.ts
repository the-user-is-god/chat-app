import { validate } from "@common/middleware/validation.middleware.js";
import express from "express";
import { channelParamsSchema, createChannelSchema } from "./channel.validation.js";
import {
  createChannel,
  getChannelById,
  getJoinedChannels,
  getPublicChannels,
} from "./channel.controller.js";
import { protect, requireVerification } from "@common/middleware/auth/auth.middleware.js";
import { memberRoutes } from "@modules/channelMembers/channel-member.routes.js";
import { channelMessageRoutes } from "@modules/messages/routes/channel-message.routes.js";
import { channelInvitationRoutes } from "@modules/invitations/routes/channel-invitation.routes.js";

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

// nested resources — channelId flows down via mergeParams
channelRoutes.use("/:channelId/members", memberRoutes);
channelRoutes.use("/:channelId/messages", channelMessageRoutes);
channelRoutes.use("/:channelId/invitations", channelInvitationRoutes);
