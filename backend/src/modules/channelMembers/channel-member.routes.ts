import { protect, requireVerification } from "@common/middleware/auth/auth.middleware.js";
import { Router } from "express";
import {
  getMyMembership,
  joinPublicChannel,
  leaveChannel,
  listMembers,
} from "./channel-member.controller.js";
import { validate } from "@common/middleware/validation.middleware.js";
import { channelParamsSchema } from "@modules/channels/channel.validation.js";

// mergeParams: true allows reading :channelId from parent channel routes
export const memberRoutes = Router({ mergeParams: true });

memberRoutes.use(protect, requireVerification);

memberRoutes.get("/", validate("params", channelParamsSchema), listMembers);
memberRoutes.get("/me", validate("params", channelParamsSchema), getMyMembership);
memberRoutes.post("/join", validate("params", channelParamsSchema), joinPublicChannel);
memberRoutes.delete("/leave", validate("params", channelParamsSchema), leaveChannel);
