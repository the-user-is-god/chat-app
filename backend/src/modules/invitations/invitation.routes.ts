import { Router } from "express";
import { protect } from "@common/middleware/auth.middleware.js";
import { createInvite, joinWithInvite, revokeInvite } from "./invitation.controller.js";

export const invitationRoutes = Router();

invitationRoutes.use(protect);

// Join channel via invitation code
invitationRoutes.post("/join", joinWithInvite);

// Channel specific invite management
invitationRoutes.post("/channels/:channelId/invites", createInvite);
invitationRoutes.patch("/invites/:inviteId/revoke", revokeInvite);
