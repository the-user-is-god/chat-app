import { z } from 'zod';

export const exampleSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  description: z.string().min(5, 'Description must be at least 5 characters'),
});

export type ExampleSchemaInput = z.infer<typeof exampleSchema>;
