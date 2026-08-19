/**
 * Unified entry point for public consumer logic.
 * Encapsulates the internal architecture structure of the API layout.
 */

// Export the core instance allowing consumers to execute standard HTTP methods: api.get(), api.post(), etc.
export { apiInstance as api } from './axios';

export { AppApiError, normalizeApiError } from './errors';

// Export typing modules for type-safe API consumers
export type { ApiResponse, ApiErrorResponse, PaginatedData } from './types';
