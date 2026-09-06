import { z } from "zod";

export const createChannelSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(15).optional(),
  avatar: z.url().optional(),
  visibility: z.enum(["PUBLIC", "PRIVATE"]).default("PRIVATE"),
});

export const channelParamsSchema = z.object({
  channelId: z.uuid("Invalid channel id format"),
});
