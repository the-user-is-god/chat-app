import { logger } from "@lib/logger.js";

export interface RetryOptions {
  retries?: number;
  delay?: number; // Initial delay in ms
  factor?: number; // Multiplier for exponential backoff
  shouldRetry?: (error: unknown) => boolean;
}

export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> => {
  const { retries = 3, delay = 1000, factor = 2, shouldRetry = () => true } = options;
  let currentDelay = delay;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= retries || !shouldRetry(error)) throw error;

      logger.warn(`Attempt ${attempt} failed. Retrying in ${currentDelay}ms...`);

      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay *= factor; // Increase waiting time exponentially
    }
  }

  throw new Error("Retry loop ended unexpectedly");
};
