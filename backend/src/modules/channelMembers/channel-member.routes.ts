import { protect } from "@common/middleware/auth.middleware.js";
import { Router } from "express";
import {
  getMyMembership,
  joinPublicChannel,
  leaveChannel,
  listMembers,
} from "./channel-member.controller.js";

// mergeParams: true allows reading :channelId from parent channel routes
export const memberRoutes = Router();

memberRoutes.use(protect);

memberRoutes.get("/:channelId", listMembers);
memberRoutes.get("/me/:channelId", getMyMembership);
memberRoutes.post("/join/:channelId", joinPublicChannel);
memberRoutes.delete("/leave/:channelId", leaveChannel);
