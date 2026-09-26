import { protect, requireVerification } from "@common/middleware/auth/auth.middleware.js";
import { validate } from "@common/middleware/validation.middleware.js";
import { channelParamsSchema } from "@modules/channels/channel.validation.js";
import { Router } from "express";
import { createInvitationSchema } from "../invitation.validation.js";
import { createInvite } from "../invitation.controller.js";

export const channelInvitationRoutes = Router({ mergeParams: true });

channelInvitationRoutes.use(protect, requireVerification);

channelInvitationRoutes.post(
  "/",
  validate("params", channelParamsSchema),
  validate("body", createInvitationSchema),
  createInvite,
);
