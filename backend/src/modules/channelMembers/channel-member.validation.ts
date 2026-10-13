import { z } from "zod";

// Change this schema to cover both nested path variables
export const updateRoleParamsSchema = z.object({
  channelId: z.uuid("Invalid channel ID format"),
  targetId: z.uuid("Invalid target member ID format"),
});

export const updateRoleBodySchema = z.object({
  role: z.enum(["ADMIN", "MODERATOR", "MEMBER", "VIEWER"], "Invalid role target"),
});
