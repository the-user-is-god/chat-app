import { protect, requireVerification } from "@common/middleware/auth.middleware.js";
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
export const memberRoutes = Router();

memberRoutes.use(protect, requireVerification);

memberRoutes.get("/:channelId", validate("params", channelParamsSchema), listMembers);
memberRoutes.get("/me/:channelId", validate("params", channelParamsSchema), getMyMembership);
memberRoutes.post("/join/:channelId", validate("params", channelParamsSchema), joinPublicChannel);
memberRoutes.delete("/leave/:channelId", validate("params", channelParamsSchema), leaveChannel);
