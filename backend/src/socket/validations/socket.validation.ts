import { z } from "zod";

export const joinChannelSchema = z.object({
  channelId: z.uuid("Invalid channel ID format"),
});

export const sendMessageEventSchema = z.object({
  channelId: z.uuid("Invalid channel ID format"),
  content: z
    .string()
    .trim() // Strips leading/trailing spaces
    .min(1, "Message content cannot be empty") // Disallows empty strings
    .max(2000, "Message cannot exceed 2000 characters"), // Realistic chat length
  clientMessageId: z.string().min(1).max(100).optional(),
  parentMessageId: z.uuid("Invalid parent message ID format").optional(),
});

export const updateMessageEventSchema = z.object({
  channelId: z.uuid("Invalid channel ID format"),
  messageId: z.uuid("Invalid channel ID format"),
  content: z
    .string()
    .trim() // Strips leading/trailing spaces
    .min(1, "Message content cannot be empty") // Disallows empty strings
    .max(2000, "Message cannot exceed 2000 characters"), // Realistic chat length
  clientMessageId: z.string().min(1).max(100).optional(),
  parentMessageId: z.uuid("Invalid parent message ID format").optional(),
});

export const deleteMessageEventSchema = z.object({
  channelId: z.uuid("Invalid channel ID format"),
  messageId: z.uuid("Invalid channel ID format"),
});

export type SendMessageEventDTO = z.infer<typeof sendMessageEventSchema>;
