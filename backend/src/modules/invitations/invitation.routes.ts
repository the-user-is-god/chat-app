import { Router } from "express";
import { protect } from "@common/middleware/auth.middleware.js";
import { createInvite, joinWithInvite, revokeInvite } from "./invitation.controller.js";
import {
  channelParamsSchema,
  createInvitationSchema,
  inviteParamsSchema,
  joinWithInviteSchema,
} from "./invitation.validation.js";
import { validate } from "@common/middleware/validation.middleware.js";

export const invitationRoutes = Router();

invitationRoutes.use(protect);

// Join channel via invitation code
invitationRoutes.post("/join", validate("body", joinWithInviteSchema), joinWithInvite);

// Channel specific invite management
invitationRoutes.post(
  "/channels/:channelId/invites",
  validate("params", channelParamsSchema),
  validate("body", createInvitationSchema),
  createInvite,
);
invitationRoutes.patch(
  "/invites/:inviteId/revoke",
  validate("params", inviteParamsSchema),
  revokeInvite,
);
