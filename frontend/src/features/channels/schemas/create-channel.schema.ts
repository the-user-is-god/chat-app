import { z } from 'zod';

export const createChannelSchema = z.object({
  name: z.string().min(3, 'Channel name should have at least 3 letters'),
  description: z.string().max(50, 'Description should be less than 50 letters'),
  visibility: z.enum(['PUBLIC', 'PRIVATE']),
});

export type CreateChannelSchemaInput = z.infer<typeof createChannelSchema>;
