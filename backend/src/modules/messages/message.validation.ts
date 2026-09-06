import { z } from "zod";

export const sendMessageSchema = z.object({
  content: z
    .string()
    .trim() // Strips leading/trailing spaces
    .min(1, "Message content cannot be empty") // Disallows empty strings
    .max(2000, "Message cannot exceed 2000 characters"), // Realistic chat length
  clientMessageId: z.uuid("Invalid client message ID format").optional(),
  parentMessageId: z.uuid("Invalid parent message ID format").optional(),
});

export const getMessagesQuerySchema = z.object({
  cursor: z.uuid("Invalid cursor token").optional(),
  // Converts incoming string query parameters to numeric values safely
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 20)) // Default to 20 messages
    .pipe(
      z
        .number()
        .int()
        .min(1, "Limit must be at least 1")
        .max(100, "Cannot fetch more than 100 messages at once"),
    ),
});
