import axios from 'axios';
import type { ApiErrorResponse } from './types';

/**
 * Custom application-level error class.
 * Isolates your UI components from having to know about Axios structural details.
 */
export class AppApiError extends Error {
  public readonly statusCode?: number;
  public readonly errors?: Record<string, string[]>;
  public readonly isNetworkError: boolean;

  constructor(
    message: string,
    options?: {
      statusCode?: number;
      errors?: Record<string, string[]>;
      isNetworkError?: boolean;
    }
  ) {
    super(message);
    this.name = 'AppApiError';
    this.statusCode = options?.statusCode;
    this.errors = options?.errors;
    this.isNetworkError = options?.isNetworkError ?? false;

    // Fix prototype chain for custom error extension native to JS engine
    Object.setPrototypeOf(this, AppApiError.prototype);
  }
}

/**
 * Intercepts raw errors coming down the wire from Axios and normalizes them
 * into a single unified format that your features can predictable consume.
 */
export function normalizeApiError(error: unknown): AppApiError {
  if (error instanceof AppApiError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    // 1. Server responded with an explicit status code out of the 2xx range
    if (error.response) {
      const serverData = error.response.data as ApiErrorResponse | undefined;
      return new AppApiError(
        serverData?.message || error.response.statusText || 'An error occurred on the server.',
        {
          statusCode: error.response.status,
          errors: serverData?.errors,
        }
      );
    }

    // 2. Request was made but no response was received from backend (e.g. server down)
    if (error.request) {
      return new AppApiError(
        'Cannot connect to the server. Please check your internet connection.',
        {
          isNetworkError: true,
        }
      );
    }
  }

  // 3. Fallback for unhandled native runtime errors or setup issues
  return new AppApiError(error instanceof Error ? error.message : 'An unexpected error occurred.');
}
