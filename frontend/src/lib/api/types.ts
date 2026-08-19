/**
 * Standard envelope format for predictable responses coming back from your Express API.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Standard structured breakdown for backend error validations.
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>; // Captures field-level validation errors (e.g., Zod errors from Express)
  statusCode?: number;
}

/**
 * Reusable layout interface mapping server-side paginated queries.
 */
export interface PaginatedData<T> {
  items: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
