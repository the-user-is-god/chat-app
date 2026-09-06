import { z } from "zod";

export const createInvitationSchema = z.object({
  maxUses: z.number().int().min(1, "Minimum uses must be at least 1").nullable().optional(),
  expiresAt: z.iso
    .datetime({ message: "Invalid ISO 8601 date string" })
    // Safely transforms valid ISO strings into standard Date objects if needed
    .transform((val) => (val ? new Date(val) : null))
    .nullable()
    .optional(),
});

export const joinWithInviteSchema = z.object({
  code: z.uuid("Invalid invitation code format"),
});

export const inviteParamsSchema = z.object({
  inviteId: z.uuid("Invalid invite id format"),
});
