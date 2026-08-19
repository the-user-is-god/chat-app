import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Infer the Form Type automatically from the runtime schema
export type LoginSchemaInput = z.infer<typeof loginSchema>;
