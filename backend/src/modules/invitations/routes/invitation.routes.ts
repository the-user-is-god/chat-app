import { Router } from "express";
import { protect, requireVerification } from "@common/middleware/auth/auth.middleware.js";
import { joinWithInvite, revokeInvite } from "../invitation.controller.js";
import { inviteParamsSchema, joinWithInviteSchema } from "../invitation.validation.js";
import { validate } from "@common/middleware/validation.middleware.js";

export const invitationRoutes = Router();

invitationRoutes.use(protect, requireVerification);

// Join channel via invitation code
invitationRoutes.post("/join", validate("body", joinWithInviteSchema), joinWithInvite);

invitationRoutes.patch(
  "/invites/:inviteId/revoke",
  validate("params", inviteParamsSchema),
  revokeInvite,
);
