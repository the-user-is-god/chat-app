import { z } from 'zod';

/**
 * Define the structural schema and validation rules for application environment variables.
 * Enforces correct types and defaults before execution continues.
 */
const envSchema = z.object({
  apiUrl: z.string().url('NEXT_PUBLIC_API_URL must be a valid absolute URL'),
  environment: z.enum(['development', 'production', 'test'], {
    errorMap: () => ({
      message: 'NEXT_PUBLIC_APP_ENV must be development, production, or test',
    }),
  }),
});

// Infer the internal type structure from our runtime validation schema
type EnvConfig = z.infer<typeof envSchema>;

/**
 * Safely parse and map raw process variables into a typed structure.
 * This object prevents accessing unverified 'process.env' strings down the line.
 */
const parseEnv = (): EnvConfig => {
  const result = envSchema.safeParse({
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    environment: process.env.NEXT_PUBLIC_APP_ENV,
  });

  if (!result.success) {
    console.error('❌ Invalid or missing environment configuration options:');
    console.error(JSON.stringify(result.error.format(), null, 2));
    throw new Error(
      'Application environment validation failed. Fix missing variables in .env.local'
    );
  }

  return result.data;
};

// Export an immutable config accessor instance
export const env: EnvConfig = parseEnv();
