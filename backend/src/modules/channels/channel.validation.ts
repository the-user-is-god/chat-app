import { z } from "zod";

export const createChannelSchema = z.object({
  name: z.string().min(5).max(100),
  description: z.string().min(1000).optional(),
  avatar: z.url().nullable().optional(),
  visibility: z.enum(["PUBLIC", "PRIVATE"]).default("PRIVATE"),
});

export const channelParamsSchema = z.object({
  channelId: z.uuid("Invalid channel id format"),
});

export const updateChannelSettingsSchema = z
  .object({
    name: z.string().trim().min(5).max(100).optional(),

    description: z.string().max(1000).nullable().optional(),

    avatar: z.url().nullable().optional(),

    visibility: z.enum(["PUBLIC", "PRIVATE"]).optional(),

    messagingMode: z.enum(["EVERYONE", "MODERATORS_ONLY"]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one setting must be provided.",
  });

export type UpdateChannelSettingsInput = z.infer<typeof updateChannelSettingsSchema>;
